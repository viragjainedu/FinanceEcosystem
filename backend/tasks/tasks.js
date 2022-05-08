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

                                //Sending mail of late fees
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                      user: 'virag.j@somaiya.edu',
                                      pass: 'dontopenthis12345'
                                    }
                                  });
                                  
                                  var mailOptions = {
                                    from: 'virag.j@somaiya.edu',
                                    to: sub_result.email,
                                    subject: 'Lote fees',
                                    text: `Your installment amount for Loan of Rs${sub_result.amount_borrowed} has been late for ${difference} days. Your late fees is '${sub_result.late_fees}'. You can visit http://localhost:3000/installments for more details.`
                                  };
                                  
                                  transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                      console.log(error);
                                      res.send({error:error})
                                    } else {
                                      console.log('Email sent: ' + info.response);
                                      res.send({success: true})
                            
                                    }
                                  });

                                callback()
                            }
                        })

                    }else if(moment(sub_result.date_of_payment) < moment(todays_date) && difference > 90){
                        
                        //default
                        connection.query(`update installments set status = 'Defaulted' where email = ? and status != 'Paid' `, [sub_result.email]
                        , (err,output)=>{
                            if(err){console.log(err)}else{

                                //Sending mail of defualt
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                      user: 'virag.j@somaiya.edu',
                                      pass: 'dontopenthis12345'
                                    }
                                  });
                                  
                                  var mailOptions = {
                                    from: 'virag.j@somaiya.edu',
                                    to: sub_result.email,
                                    subject: 'Loan Defaulted',
                                    text: `Your Loan of Rs${sub_result.amount_borrowed}  has been defaulted. You've exceeded your installment for more than 90 days. You can visit http://localhost:3000/installments for more details.`
                                  };
                                  
                                  transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                      console.log(error);
                                      res.send({error:error})
                                    } else {
                                      console.log('Email sent: ' + info.response);
                                      res.send({success: true})
                            
                                    }
                                  });

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
