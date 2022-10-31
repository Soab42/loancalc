import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Daily from "./page/daily/Daily";
import Newcalc from "./page/new/Newcalc";
import Oldcalc from "./page/old/Oldcalc";
import Calculator from "./page/Calculator";

function MyTabBar({ state, descriptors, navigation }) {
  const [calcstatus, setCalcstatus] = useState(false);
const calchandle=()=>{!calcstatus ? setCalcstatus(true) : setCalcstatus(false)}
  
  return (
    <View style={{ flexDirection: "row", backgroundColor: "white" }}>
      <StatusBar backgroundColor="lightgreen" />
      <Text style={{
             height:50,
              width:50,
              position:'absolute',
              top:-60,
              left:10
          }}>
          <TouchableOpacity onPress={calchandle}>
          <Text style={{
             height:50,
              width:50,
              padding:10,
              backgroundColor:'Tomato',
              textAlignVertical:'center',
              textAlign:'center',
              borderRadius:40,
              borderWidth:2,
          }} > + </Text>
        </TouchableOpacity> 
        </Text>
       <Text style={{
        position:'absolute',
        
        backgroundColor:"rgba(155,165,185,.7)",
        padding:10,
        borderRadius:25,
        top:-350,
        left: !calcstatus ? -500 : 35,}}> 
        <Calculator />
        </Text>
     
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 40,
              margin: 5,
              marginBottom: 30,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isFocused ? "lightgreen" : "white",
            }}
          >
            <Text style={{ fontSize: 12 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ backgroundColor: "lightgreen" }}>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
  
        <Tab.Screen name="Daily Calculation" component={Daily} />
            <Tab.Screen name="New Calculation" component={Newcalc} />
        <Tab.Screen name="Old Calculation" component={Oldcalc} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
