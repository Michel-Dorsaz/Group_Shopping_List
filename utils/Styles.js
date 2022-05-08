import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    containerLeft: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row-reverse'

    },
    scrollContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    title: {
        fontWeight: 'bold', 
        fontSize: 18
    },
    header: {
      fontWeight: 'bold', 
      fontSize: 24
    },
    readOnly: {
      opacity: 0.3
    },
    adjustedTop: {
        marginTop: 30   
    },
    buttonValidate: {
      backgroundColor: 'green',
      marginRight: 30,
      width: 100
    },
    bottomView: {
      height: 50, 
      position: 'absolute',
      end: 20,
      bottom: 20,
      flexDirection: 'row-reverse'
    },
    leftView:{
      width: '100%', 
      flexDirection: 'row-reverse'
    },
    listItem: {
      width: '100%'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      justifyContent: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonAdd: {
      width: 50,
      height: 50
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    }
  });

export { styles };