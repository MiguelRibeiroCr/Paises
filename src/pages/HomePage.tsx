import { useEffect, useState } from "react";
import Entity from "../entities/entities";
import { FlatList, View, Text, StyleSheet } from "react-native";
import {Image} from "expo-image";
 

export default function HomePage(){
    const[countries, setCountries] = useState<Entity[]>([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
        };
        var countryList: Entity[] =[];

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {result.map((item) =>{
                countryList.push({
                    id: item.name.common,
                    name: item.name.common,
                    ptName: item.translations.por.common,
                    flagUrl: item.flags.svg,
                    population: item.population,
                    capital: item.capital,
                    region: item.region,
                })
            })
    })

    .catch(error => console.log('error',error));

    setCountries(countryList);
    
    },[])
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Países</Text>

            <FlatList

                renderItem={(countries) =>
                    <View style={styles.card} id={countries.item.id}>
                        <View>
                            <Image style={styles.flag} source={{uri:countries.item.flagUrl}} />
                        </View>

                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600' , marginTop:20,}}>{countries.item.name}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6,  }}>Nome: {countries.item.ptName}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6,  }}>Capital: {countries.item.capital}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6,  }}>Região: {countries.item.region}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6,  }}>População: {countries.item.population}</Text>
                        </View>
                    </View>
                }
                data={countries}
                keyExtractor={(item) => item.id}
            >
            </FlatList>

        </View>
    );
}

    const styles = StyleSheet.create({
       
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50,
            backgroundColor:'#7b8f8a'
        },
        title: {
            fontSize: 30,
            fontWeight: '600', 
            marginBottom: 10,
            marginHorizontal:10
        },
        card: {
            width:'95%',
            margin:10,
            aspectRatio: 2.0,
            backgroundColor: 'white',
            elevation: 2,
            borderRadius: 20,
            justifyContent: 'flex-start',
            flexDirection:'row',
            marginTop:20,  
            shadowOpacity:1.5
        },
        flag: {
            width: 80,
            height: 70,
            marginRight: 20,
            marginTop:40,
            marginHorizontal:20,
            borderRadius:4,
            
        },
      
    });
    