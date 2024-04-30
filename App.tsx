/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#fff',
  };
  const [campaignList, setCampaignlist] = useState([])
  const [loading, setloading] = useState(true)
  useEffect(() => {
    
    getData()
  }, [])

  const getData = async () => {
    try {
      const data = await axios.post('https://api.dubaicharity.org/api/campaignlist')
      const data1:any = JSON.stringify(data?.data?.data)
      // console.log('dataa44', JSON.parse(data1)[0])
      setCampaignlist(JSON.parse(data1))
      setloading(false)
    } catch (error) {
      console.log('errrr', error)
      setloading(false)


    }

  }


  return (
    <SafeAreaView style={[backgroundStyle,{flex:1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
       {loading? 
       <View style={{display:'flex',alignItems:'center',paddingTop:'45%'}}>

         <Text style={{fontSize:20,color:'#000'}}>Loading.....</Text>
       </View>
       :<View>
          {campaignList?.length > 0 && campaignList?.map((v: any, i: number): any => {
            return (
              <View style={{marginBottom:30,padding:20}}>
              <Text>{v?.donation_title}</Text>
              <Image src={'https://dubaicharity.org/'+v?.donation_cover_image_mobile} style={{width:200,height:200}}/>
              <Text style={{color:'#000'}}>{v?.donation_desc}</Text>
              </View>
            )
          })}
        </View>}


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
