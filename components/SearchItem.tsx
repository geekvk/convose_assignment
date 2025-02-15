import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'

interface SearchItemProps {
    imageUri : String,
    text : String,
    subText : String
}
const SearchItem  : React.FC<SearchItemProps> = ({ imageUri, text, subText }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri: imageUri }}
                style={styles.imageContainer}
            />
            <View style={styles.subContainer}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.subText}>{subText}</Text>
            </View>
        </View>
    )
}

export default SearchItem

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        paddingVertical : 2,
        paddingHorizontal : 4,
        alignItems : 'center'
    },
    imageContainer: {
        width : 50,
        height : 50,
        resizeMode : 'center'
    },
    subContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    text : {
        fontSize : 16,
        fontWeight : 'bold',
        marginRight : 10
    },
    subText : {
        fontSize : 12,
        color : 'gray'
    }
})