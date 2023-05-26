import React from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import {TextSection} from '../../../global/Components';
import {LineChart} from 'react-native-chart-kit';
import Colors from '../../../global/colorScheme';

const GenerationHistoric = ({project}) => {
  const [chardata, setChartdata] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const power = [],
      labelsMonths = [];
    /*
    if (project.data.overview.generationHistoric) {
      project.data.overview.generationHistoric.month.forEach(m => {
        const month = m.date.split('-')[1];
        switch (month) {
          case '01':
            labelsMonths.push('Jan');
            break;
          case '02':
            labelsMonths.push('Fev');
            break;
          case '03':
            labelsMonths.push('Mar');
            break;
          case '04':
            labelsMonths.push('Abr');
            break;
          case '05':
            labelsMonths.push('Mai');
            break;
          case '06':
            labelsMonths.push('Jun');
            break;
          case '07':
            labelsMonths.push('Jul');
            break;
          case '08':
            labelsMonths.push('Ago');
            break;
          case '09':
            labelsMonths.push('Set');
            break;
          case '10':
            labelsMonths.push('Out');
            break;
          case '11':
            labelsMonths.push('Nov');
            break;
          case '12':
            labelsMonths.push('Dez');
            break;
        }
        power.push(m.energy);
      });
    }*/

    setChartdata({
      labels: labelsMonths,
      power: power,
    });

    setLoading(false);
  }, []);

  if (project.data.overview.generationHistoric && chardata) {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <View>
          <TextSection value={'Histórico de geração'} />
          <LineChart
            data={{
              labels: chardata.labels,
              datasets: [
                {
                  data: chardata.power,
                },
              ],
            }}
            width={Dimensions.get('window').width - 40} // from react-native
            height={240}
            yAxisLabel=""
            yAxisSuffix="kwh"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: Colors.whitetheme.primary,
              backgroundGradientFrom: Colors.whitetheme.primary,
              backgroundGradientTo: Colors.whitetheme.primary,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#fff',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      );
    }
  }
};

export default GenerationHistoric;
