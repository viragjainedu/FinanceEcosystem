const cron = require('node-cron');
var connection = require('../connection');
var moment = require('moment');
var async = require('async');

module.exports = () => {  
    cron.schedule('0 8 * * *', () => {
        
        var todays_date = moment(new Date()).format('YYYY-MM-DD')
        // console.log(todays_date)
        //check for loan defaults.
        connection.query("Select * from installments" , [], (err,result) => {
            if(err){
                console.log(err)
                res.send({message:err})
            }else{
                async.eachSeries(result,function(sub_result,callback){
                    var difference = moment.duration(moment(todays_date).diff(moment(sub_result.date_of_payment))).asDays();
                    
                    // console.log(` id - ${sub_result.installment_id} diff - ${difference} payment date: ${sub_result.date_of_payment} `)
                    // console.log(sub_result.date_of_payment < todays_date)
                    
                    if(moment(sub_result.date_of_payment) < moment(todays_date) && difference < 90){
                        
                        //late fees
                        var late_fees = difference*(sub_result.installment_amount/30)

                        connection.query(`update installments set status = 'Late by ${difference} days', late_fees = ? where installment_id = ? `, [late_fees,sub_result.installment_id]
                        , (err,output)=>{
                            if(err){console.log(err)}else{
                                callback()
                            }
                        })

                    }else if(moment(sub_result.date_of_payment) < moment(todays_date) && difference > 90){
                        
                        //default
                        connection.query(`update installments set status = 'Defaulted' where email = ? and status != 'Paid' `, [sub_result.email]
                        , (err,output)=>{
                            if(err){console.log(err)}else{
                                callback()
                            }
                        })
                    }else{
                        callback()
                    }

                },function(err,output){
                    if(err){console.log(err)}

                });
            
            }
        })
    });
}
