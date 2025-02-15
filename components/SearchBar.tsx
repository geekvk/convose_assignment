import {StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text} from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import SearchItem from "@/components/SearchItem";
import {BAE_URL} from "@/constants/Api";

const sortInterests = (interests) => {
    return interests.sort((a, b) => {
        if (b.match === a.match)
            return a.name.localeCompare(b.name)

        return b.match - a.match
    })
}
const SearchBar = ()  => {
    const[query, setQuery] = useState("")
    const[suggestions, setSuggestions] = useState([])
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length === 0) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(BAE_URL, {
                    params: {
                        q: debouncedQuery,
                        limit: 12,
                        from: 0,
                    },
                    headers: {
                        Accept: "application/json",
                        "Accept-Encoding": "gzip, deflate, br, zstd",
                        "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,de-DE;q=0.7,de;q=0.6",
                        Authorization: "Jy8RZCXvvc6pZQUu2QZ2",
                        Connection: "keep-alive",
                    },
                });
                console.log(response.data)
                const sorted = sortInterests(response.data.autocomplete || [])
                setSuggestions(sorted)
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    const handleSelectSuggestion = (name) => {
        setQuery(name);
        setSuggestions([]);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={setQuery}
                placeholder="Type something..."
            />
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.suggestionsList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleSelectSuggestion(item.name)}
                        >
                            <SearchItem imageUri={item.avatar} text={item.name} subText={item.type}/>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )

}

export default SearchBar;

const styles = StyleSheet.create({
    container : {
        backgroundColor: "#f4f4f4"
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        fontSize: 16,
    },
    suggestionsList: {
        marginTop: 5,
        maxHeight: 200,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
});
