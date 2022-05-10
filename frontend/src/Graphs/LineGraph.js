import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'

export default class Example extends PureComponent {

  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  
  render() {

const data = this.props.installments.map(installment => {
  if(installment.time_of_payment !== null){
    return(
      {
        Id: moment(installment.time_of_payment).format('DD-MM-YYYY'),
        Installment : installment.installment_amount + installment.late_fees
      }
    )
  }else{
    return(
      {
        Id: 'Expected',
        Installment : installment.installment_amount + installment.late_fees
      }
    )
  }
});

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   }
// ];

    return (
      <>
      {/* {console.log(this.props.installments)} */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Id" />
          <YAxis domain={[0, 4000]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Installment" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
      </>
    );
  }
}
