import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default function Calculator() {
  const [data, setdata] = useState();
  const [result, setResult] = useState();
  const calculate = () => {
    setResult(eval(data));
  };
  const Reset = () => {
    setdata();
    setResult();
  };
  return (
    <View style={{ height: 200, width: 300, alignSelf: "center" }}>
      <View>
        <Text
          style={{
            backgroundColor: "lightgreen",
            textAlign: "center",
            height: 40,
            textAlignVertical: "center",
            padding: 5,
            borderRadius: 15,
          }}
        >
          Calculator
        </Text>
        <TextInput
          style={{
            height: 40,
            borderRadius: 25,
            backgroundColor: "white",
            width: 300,
            textAlign: "center",
            marginBottom: 10,
            marginTop: 10,
          }}
          placeholder={"9500*3+245-10/2"}
          onChangeText={setdata}
          cursorColor="black"
          keyboardType="numeric"
        >
          {data}
        </TextInput>
        <Text
          style={{
            height: 40,
            borderRadius: 25,
            backgroundColor: "lightblue",
            width: 300,
            marginBottom: 10,
            textAlignVertical: "center",
            textAlign: "left",
            paddingLeft: 20,
          }}
        >
          Result: {result}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={{ width: 150 }} onPress={calculate}>
            <Text
              style={{
                height: 40,
                borderRadius: 25,
                width: 100,
                backgroundColor: "lightgreen",
                width: 150,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Calculate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 150 }} onPress={Reset}>
            <Text
              style={{
                height: 40,
                borderRadius: 25,
                backgroundColor: "tomato",
                width: 150,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
