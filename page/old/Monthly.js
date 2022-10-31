import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

export default function Monthly(props) {
  const [cdate3, setCdate3] = useState(props.loandisbursedate);
  const [principle3, setPrinciple3] = useState(0);
  const [servicecharge3, setServicecharge3] = useState(0);
  const [outstanding3, setOutstanding3] = useState(0);
  const [recoverable3, setRecoverable3] = useState(0);
  const [sl, setSl] = useState();
  useEffect(() => {
    async function getdata() {
      const day = cdate3 - props.loandisbursedate + 30;
      setServicecharge3(
        props.openingoutstanding * day * (props.interestrate / 36000)
      );
      props.recoverable < props.openingoutstanding
        ? setRecoverable3(props.recoverable)
        : setRecoverable3(props.openingoutstanding + servicecharge3);

      setPrinciple3(recoverable3 - servicecharge3);
      setOutstanding3(props.openingoutstanding - principle3);
      setSl(props.sl + 1);
      console.log(sl);
    }
    getdata();
  }, [
    cdate3,
    servicecharge3,
    principle3,
    recoverable3,
    props.openingoutstanding,
    props.loandisbursedate,
    props.recoverable,
    props.interestrate,
  ]);

  return (
    <>
      <View style={styles.contenttableheader}>
        <Text style={{ ...styles.tablecontenttext, flex: 3 }}>{sl}</Text>
        <Text style={{ ...styles.tablecontenttext, flex: 4 }}>
          {props.loandisbursedate}
        </Text>
        <TextInput
          style={styles.tablecontentinput}
          onChangeText={setCdate3}
          keyboardType="numeric"
        >
          {cdate3}
        </TextInput>

        <Text style={styles.tablecontenttext}>{Math.ceil(recoverable3)}</Text>
        <Text style={styles.tablecontenttext}>{Math.ceil(principle3)}</Text>
        <Text style={styles.tablecontenttext}>
          {Math.round(servicecharge3)}
        </Text>
        <Text style={styles.tablecontenttext}>{Math.ceil(outstanding3)}</Text>
      </View>
      <View>
        {outstanding3 > 0 ? (
          <Monthly
            sl={sl}
            loandisbursedate={props.loandisbursedate}
            interestrate={props.interestrate}
            recoverable={props.recoverable}
            openingoutstanding={outstanding3}
          />
        ) : null}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  contenttableheader: {
    flexDirection: "row",
  },

  tablecontenttext: {
    height: 20,
    flex: 7,
    textTransform: "capitalize",
    textAlign: "center",
    borderWidth: 0.3,
    fontSize: 12,
    paddingHorizontal: 2,
    textAlignVertical: "center",
  },
  tablecontentinput: {
    height: 20,
    flex: 4,
    textTransform: "capitalize",
    textAlign: "center",
    borderWidth: 0.3,
    fontSize: 12,
    paddingHorizontal: 2,
    textAlignVertical: "center",
    backgroundColor: "white",
    color: "black",
  },
});
