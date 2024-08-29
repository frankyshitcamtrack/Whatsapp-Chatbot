import {Pie,PieChart,Cell,Legend} from 'recharts'
export default function Chart({values,colors}) {
    const data = values;
    const COLORS =colors;
    return (
        <PieChart width={300} height={300} >
        <Legend layout="horizontal" verticalAlign="bottom" align="center"  wrapperStyle={{fontSize: "12px"}}/>
          <Pie
            data={data}
            labelLine={false}
            label={true}
            outerRadius={100}
            dataKey="value"
            legendType='circle'
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      );
}
    