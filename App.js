import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [preRes, setPresRes] = useState('')

  const calculate = (title) => {
    if (title == 'C') {
      setResult('')
      setPresRes('')
      setHistory([])
    } else if (title == 'DL') {
      setResult(result.substring(0, result.length - 1));
    } else if (title == '=') {
      const ans = Number(eval(result).toFixed(2)).toString();
      setResult(ans);
      setHistory([...history, result + '=' + ans]);
      setPresRes('');
      setResult('');

    } else {
      setResult(result + title);
    }
  }
  useEffect(() => {
    try {

      const ans = Number(eval(result).toFixed(2)).toString();
      setPresRes(ans);
    } catch (err) {
      console.log(err)
    }
  }, [result])

  const ButtonElement = ({ title, type }) => (
    <TouchableOpacity
      onPress={() => calculate(title)}
      style={styles.calculateButtonsElements}>
      <Text
        style={{
          fontSize: type == 'bottom' ? 40 : 40,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: getButtonElementColor(type),
          fontWeight: type == 'bottom' ? 'bold' : 'normal',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const getButtonElementColor = (type) => {
    if (type == 'top') {
      return 'orange'
    } else if (type == 'bottom') {
      return 'red'
    }
    else {
      return '#000'
    }

  }
  return (
    <View style={styles.container}>
      {
        history.map((item, index) => {
          return (

            <View key={index} style={styles.history}>
              <Text
                style={styles.historyText}>{item}</Text>
            </View>

          )
        })
      }

      <Text
        style={styles.resultText}>
        {result}
      </Text>

      <Text
        style={styles.preResultText}>
        {preRes}
      </Text>

      <View style={styles.calculateButtons}>
        <ButtonElement title="C" type="top" />
        <ButtonElement title="DL" type="top" />
        <ButtonElement title="/" type="top" />
        <ButtonElement title="%" type="top" />
        <ButtonElement title="7" type="number" />
        <ButtonElement title="8" type="number" />
        <ButtonElement title="9" type="number" />
        <ButtonElement title="*" type="top" />
        <ButtonElement title="4" type="number" />
        <ButtonElement title="5" type="number" />
        <ButtonElement title="6" type="number" />
        <ButtonElement title="+" type="top" />
        <ButtonElement title="1" type="number" />
        <ButtonElement title="2" type="number" />
        <ButtonElement title="3" type="number" />
        <ButtonElement title="-" type="top" />
        <ButtonElement title="00" type="number" />
        <ButtonElement title="0" type="number" />
        <ButtonElement title="." type="number" />
        <ButtonElement title="=" type="bottom" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: '100%',
    paddingVertical: 20,
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  history: {
    flexDirection: "column-reverse",
    width: '100%'
  },
  historyText: { textAlign: 'right', marginRight: 10, fontSize: 20 },
  resultText: {
    fontSize: 40,
    width: '100%',
    textAlign: 'right',
    paddingRight: 20,
    color: '#000',
    position: "absolute",
    bottom: "65%",
    // backgroundColor: "lightgreen",
    marginTop: 160,
    paddingBottom: 10
  },
  preResultText: {
    fontSize: 30,
    width: '100%',
    textAlign: 'right',
    paddingRight: 20,

    position: "absolute",
    bottom: "60%",
    // backgroundColor: "lightgreen",
    marginTop: 160,
    paddingBottom: 10

  },
  calculateButtons: { flexDirection: "row", flexWrap: 'wrap', 
  justifyContent: "center", backgroundColor: "#fff", bottom: 3, 
  position: "absolute", elevation: 7, borderTopLeftRadius: 20, 
  borderTopRightRadius: 20, width: "100%" },
  calculateButtonsElements:{
    backgroundColor: "#f2f1ed",
    height: 70,
    width: 70,
    borderRadius: 40,
    margin: 10,
    padding: 10,
    elevation: 4
  }
});
