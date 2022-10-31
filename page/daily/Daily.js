import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function Daily() {
  const [outstanding, setOutstanding] = useState(0);
  const [rate, setRate] = useState(0);
  const [recoverable, setRecoverable] = useState(0);
  const [servicecharge, setservicecharge] = useState(0);
  const [pdate, setpDate] = useState(0);
  const [cdate, setcDate] = useState(0);
  const [day, setDay] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [lastoutstanding, setLastoutstanding] = useState(0);
  const [finalservicecharge, setFinalservicecharge] = useState([]);

  useEffect(() => {
    setDay(cdate - pdate + 30);
    setservicecharge(outstanding * day * (rate / 36000));
    recoverable < outstanding
      ? setRecoverable(recoverable)
      : setRecoverable(outstanding + servicecharge);
    setPrincipal(recoverable - servicecharge);
    setLastoutstanding(outstanding - principal);
  }, [
    outstanding,
    day,
    rate,
    cdate,
    pdate,
    recoverable,
    principal,
    servicecharge,
  ]);

  const handleAddTask = () => {
    setFinalservicecharge([
      {
        outstanding,
        day,
        rate,
        servicecharge,
        recoverable,
        principal,
        lastoutstanding,
      },
    ]);
  };
  const genehandle = () => {
    setRate(24);
    setOutstanding(100000);
    setRecoverable(9500);
  };
  const handleResetTask = () => {
    setRate("");
    setcDate("");
    setpDate("");
    setOutstanding("");
    setRecoverable("");
  };

  return (
    <View>
      <ScrollView style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.htext}>Loan Interest Calculation</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.lebel}>Loan Outstanding</Text>
            <TextInput
              style={styles.input}
              placeholder={"Loan Outstanding"}
              onChangeText={(x) => setOutstanding(Number(x))}
              cursorColor="lightgreen"
              keyboardType="numeric"
            >
              {Math.ceil(outstanding)}
            </TextInput>
            <Text style={styles.lebel}>Previous Month Collection Date</Text>
            <TextInput
              style={styles.input}
              placeholder={"Previous Collection Date"}
              dataDetectorTypes="calendarEvent"
              value={pdate}
              cursorColor="lightgreen"
              keyboardType="numeric"
              onChangeText={(text) => setpDate(Number(text))}
            />
            <Text style={styles.lebel}>This Month Collection Date</Text>
            <TextInput
              style={styles.input}
              placeholder={"Collection Date"}
              dataDetectorTypes="calendarEvent"
              cursorColor="lightgreen"
              value={cdate}
              keyboardType="numeric"
              onChangeText={(text) => setcDate(Number(text))}
            />

            <Text style={styles.lebel}>Interest Rate</Text>
            <TextInput
              style={styles.input}
              placeholder={"Interest Rate"}
              keyboardType="numeric"
              cursorColor="lightgreen"
              onChangeText={(text) => setRate(text)}
            >
              {rate}
            </TextInput>
            <Text style={styles.lebel}>Recoverable Amount</Text>
            <TextInput
              style={styles.input}
              placeholder={"Recoverable Amount"}
              keyboardType="numeric"
              cursorColor="lightgreen"
              onChangeText={(text) => setRecoverable(text)}
            >
              {Math.ceil(recoverable)}
            </TextInput>

            <View style={styles.add}>
              <TouchableOpacity onPress={() => handleAddTask()}>
                <Text style={styles.calculate}>Calculate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={genehandle}>
                <Text
                  style={{ ...styles.calculate, backgroundColor: "lightblue" }}
                >
                  Auto Fill
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleResetTask()}>
                <Text style={styles.reset}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {finalservicecharge.map((fservicecharge) => {
          return (
            <View style={styles.servicecharge}>
              <View style={styles.servicechargetext}>
                <Text style={styles.resulttitle}>Loan Outstanding:</Text>
                <Text style={styles.resulcontent}>
                  {Math.ceil(fservicecharge.outstanding)}
                </Text>
              </View>
              <View style={styles.servicechargetext}>
                <Text style={styles.resulttitle}>Day Of Collection: </Text>
                <Text style={styles.resulcontent}>{fservicecharge.day}</Text>
              </View>
              <View style={styles.servicechargetext}>
                <Text style={styles.resulttitle}>Inteset Rate: </Text>
                <Text style={styles.resulcontent}>{fservicecharge.rate}</Text>
              </View>
              <View style={styles.servicechargetext}>
                <Text style={styles.resulttitle}>This Month Interest: </Text>
                <Text style={styles.resulcontent}>
                  {Math.ceil(fservicecharge.servicecharge)}
                </Text>
              </View>
              <View style={styles.servicechargetext}>
                <Text style={styles.resulttitle}>
                  This Month Principal Amount:
                </Text>
                <Text style={styles.resulcontent}>
                  {Math.ceil(fservicecharge.principal)}
                </Text>
              </View>
              <View style={styles.servicechargetext}>
                <Text style={styles.resulttitle}>
                  This Month Recoverable Amount:
                </Text>
                <Text style={styles.resulcontent}>
                  {Math.ceil(fservicecharge.recoverable)}
                </Text>
              </View>
              <View style={styles.servicechargetext}>
                <Text style={styles.resulttitle}>Last Outstanding:</Text>
                <Text style={styles.resulcontent}>
                  {Math.round(fservicecharge.lastoutstanding)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgba(0,255,0,0.15)",
    paddingBottom: 20,
  },
  lebel: {
    marginLeft: 10,
    fontWeight: "Bold",
  },
  resulttitle: {
    flex: 3,
    height: 30,
    paddingLeft: 10,
    textAlignVertical: "center",
  },
  resulcontent: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 2,
    fontSize: 13,
    fontWeight: "bold",
    textAlignVertical: "center",
    backgroundColor: "pink",
    borderBottomLeftRadius: 15,
    borderRadius: 15,
    borderTopRightRadius: 15,
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
  htext: {
    fontSize: 20,
  },
  form: {
    padding: 10,
    justifyContent: "center",
  },
  add: {
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    textAlignVertical: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calculate: {
    color: "black",
    backgroundColor: "lightgreen",
    borderRadius: 2,
    fontSize: 14,
    width: 100,
    textAlignVertical: "center",
    textTransform: "capitalize",
    height: 30,
    textAlign: "center",
  },
  reset: {
    color: "black",
    backgroundColor: "tomato",
    borderRadius: 2,
    textTransform: "capitalize",
    fontSize: 14,
    textAlignVertical: "center",
    width: 100,
    textAlign: "center",
    height: 30,
  },
  input: {
    margin: 5,

    height: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  disabled: {
    margin: 5,
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
  },
  servicecharge: {
    padding: 10,
  },
  servicechargetext: {
    backgroundColor: "lightgreen",
    marginTop: 5,
    borderTopRightRadius: 15,
    borderRadius: 15,
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 10,
  },
});

export default Daily;
