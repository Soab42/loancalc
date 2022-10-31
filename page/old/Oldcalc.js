import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Monthly from "./Monthly";
import Calculator from "../Calculator";

export default function Oldcalc() {
  const [loandisbursedate, setLoandisbursedate] = useState(0);
  const [interestrate, setInterestrate] = useState(0);
  const [openingoutstanding, setopeningOutstanding] = useState(0);
  const [recoverable, setRecoverable] = useState(0);
  const [data, setData] = useState([]);

  const datasender = () => {
    setData([
      { loandisbursedate, interestrate, openingoutstanding, recoverable },
    ]);
  };
  const genehandle = () => {
    setLoandisbursedate(1);
    setInterestrate(24);
    setRecoverable(9500);
    setopeningOutstanding(100000);
  };
  const resethandle = () => {
    setLoandisbursedate(0);
    setInterestrate(0);
    setRecoverable(0);
    setopeningOutstanding(0);
    setData([]);
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>PassBook</Text>
      </View>
      <View>
        <View style={styles.tableheader}>
          <Text style={styles.inputheadertop}>Disburse Date</Text>
          <Text style={styles.inputheadertop}>interest Rate</Text>
          <Text style={styles.inputheadertop}>recoverable amount</Text>
          <Text style={styles.inputheadertop}>Opening Outstanding</Text>
        </View>
        <View style={styles.tableheader}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputheader}
            onChangeText={(number) => setLoandisbursedate(Number(number))}
          >
            {loandisbursedate}
          </TextInput>
          <TextInput
            keyboardType="numeric"
            style={styles.inputheader}
            onChangeText={(number) => setInterestrate(Number(number))}
          >
            {interestrate}
          </TextInput>

          <TextInput
            keyboardType="numeric"
            style={styles.inputheader}
            onChangeText={(number) => setRecoverable(Number(number))}
          >
            {recoverable}
          </TextInput>

          <TextInput
            keyboardType="numeric"
            style={styles.inputheader}
            onChangeText={(number) => setopeningOutstanding(Number(number))}
          >
            {openingoutstanding}
          </TextInput>
        </View>
      </View>

      {openingoutstanding > 0 ? (
        <>
          <View style={styles.contenttableheader}>
            <Text style={{ ...styles.tableheadertext, flex: 1.85 }}>#</Text>
            <Text style={{ ...styles.tableheadertext, flex: 2.35 }}>
              recoverable date
            </Text>
            <Text style={{ ...styles.tableheadertext, flex: 2.4 }}>
              collection date
            </Text>
            <Text style={styles.tableheadertext}>recoverable amount</Text>
            <Text style={styles.tableheadertext}>principle</Text>
            <Text style={styles.tableheadertext}>service charge</Text>
            <Text style={styles.tableheadertext}>Outstanding</Text>
          </View>

          {data.map((x) => (
            <ScrollView style={{ height: 360 }}>
              <Monthly
                sl={Number(0)}
                loandisbursedate={x.loandisbursedate}
                interestrate={x.interestrate}
                recoverable={x.recoverable}
                openingoutstanding={x.openingoutstanding}
              />
            </ScrollView>
          ))}
        </>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity onPress={datasender}>
          <Text style={styles.generate}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={genehandle}>
          <Text style={{ ...styles.generate, backgroundColor: "lightblue" }}>
            Auto Fill
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resethandle}>
          <Text style={{ ...styles.generate, backgroundColor: "tomato" }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgba(0,255,0,0.15)",
    paddingHorizontal: 5,
  },
  generate: {
    textAlign: "center",
    textAlignVertical: "center",
    textTransform: "capitalize",
    backgroundColor: "lightgreen",
    width: 100,
    height: 30,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    height: 30,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  },
  contenttableheader: {
    flexDirection: "row",
  },
  tableheadertext: {
    height: 45,
    flex: 4,
    textTransform: "capitalize",
    textAlign: "center",
    borderWidth: 0.3,
    fontSize: 9,

    textAlignVertical: "center",
  },
  tablecontenttext: {
    height: 20,
    flex: 7,
    textTransform: "capitalize",
    textAlign: "center",
    borderWidth: 0.3,
    fontSize: 12,
    paddingHorizontal: 10,
    textAlignVertical: "center",
  },
  tablecontentinput: {
    height: 20,
    flex: 7,
    textTransform: "capitalize",
    textAlign: "center",
    borderWidth: 0.3,
    fontSize: 12,
    paddingHorizontal: 10,
    textAlignVertical: "center",
    backgroundColor: "white",
    color: "black",
  },
  tableheader: {
    display: "flex",
    flexDirection: "row",
  },
  tablerow: {
    flexDirection: "row",

    justifyContent: "flex-start",
  },
  inputheader: {
    flex: 4,
    textAlign: "center",
    textAlignVertical: "center",
    height: 30,
    borderWidth: 0.3,

    textTransform: "capitalize",
    backgroundColor: "white",
  },
  inputheadertop: {
    flex: 4,
    textAlign: "center",
    textAlignVertical: "center",
    height: 40,
    fontSize: 12,
    borderWidth: 0.3,
    paddingHorizontal: 5,
    textTransform: "capitalize",
  },

  date: { borderWidth: 0.3, width: 60, height: 40, paddingHorizontal: 4 },
  input: { width: 65, height: 40, borderWidth: 0.3, paddingHorizontal: 10 },
  value: {
    width: 65,
    height: 40,
    borderWidth: 0.3,
    paddingHorizontal: 10,
    paddingTop: 13,
  },
});
