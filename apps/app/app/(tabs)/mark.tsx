import {View,Text, StyleSheet} from "react-native"

export default function() {
return (
<View style={style.main}>

<Text>This is daily attendance marker</Text>

</View>
)
}


const style = StyleSheet.create({
    main : {
flex : 1,
justifyContent: 'center',
alignItems: 'center'
    }
})