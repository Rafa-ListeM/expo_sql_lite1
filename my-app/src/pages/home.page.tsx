import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AnimalService from '../services/animal.service'
import Icon from 'react-native-vector-icons/Ionicons';
import { Animal } from '../models/animal.model'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.findAllAnimal()        
    }

    state = {
        data: [],
        value: null,
        onChangeText: null,
        dataId: null,
        dataInsert:null
    }

    //acionado quando o componente e montado
    componentDidMount () {
        this.findAllAnimal ();
      }

      //escuta atualizações na lista
      componentDidUpdate (prevProps, prevState) {
        if (prevState.data !== this.state.data) {
          this.findAllAnimal ();
        }
      }
   
    deleteAnimal=(id)=> {
        this.findAnimalById(id)
        if (this.state.dataId != null || this.state.dataId != undefined) {
            AnimalService.deleteById(id)
            alert("Animal excluido com sucesso: ")
        }
    }

    insertAnimal=(item)=> {
        let file:Animal=new Animal()
        file.nome=item

        const insertId=AnimalService.addData(file);
        if(insertId==null || insertId==undefined){
            alert("Não foi possivel inserir o novo animal")
        }
    }

    findAllAnimal=()=> {
        AnimalService.findAll()
            .then((response: any) => {
                this.setState({
                    data: response._array,
                    isLoading: false,
                })
            }), (error) => {
                console.log(error);
            }
    }
    findAnimalById=(id)=> {
        AnimalService.findById(id)
            .then((response: any) => {
                if (response._array.length >0 && response!= null && response!= undefined) {
                    this.setState({
                        dataId: response._array[0]
                    })
                } else {
                    alert("id não encontrado")
                }
            }), (error) => {
                console.log(error);
            }
    }
    render() {

        //extrai as propriedades entre chaves
        const {data,value,dataInsert} = this.state;
        
        const animalList = data.map((item, key) => {
            return (
                <>
                    <Text style={{ color:'white' }}>id:{item.id} nome:{item.nome}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                

                <Text style={{ fontSize: 30, paddingBottom: 30, color:'black' }}>Lista de Animais</Text>
                <TextInput
                    placeholder="Digite o id"
                    style={{ alignItems: "center", backgroundColor: '#F4A460', width: 200, height: 40, borderRadius: 150, textAlign:'center', borderWidth: 2, justifyContent: 'center',}}
                    onChangeText={text => { this.setState({ value: text }) }}
                    value={value}
                />
               <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { value == null ? alert("O campo de id não pode ser vazio") : this.deleteAnimal(value) }} style={{ alignItems: "center", backgroundColor: '#800000' }}>
                        <Icon name="md-remove" size={30} color="#D2691E"/>
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Nome do novo animal"
                    style={{ alignItems: "center", backgroundColor: '#F4A460', width: 200, height: 40, borderRadius: 150, textAlign:'center', borderWidth: 2, justifyContent: 'center',}}
                    onChangeText={textAdd => { this.setState({ dataInsert: textAdd }) }}
                    value={dataInsert}
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  dataInsert == null ? alert("O campo de nome não pode ser vazio") :this.insertAnimal(dataInsert)} style={{ alignItems: "center", backgroundColor: '#800000' }}>
                        <Icon name="md-add" size={30} color="#D2691E" />
                    </TouchableOpacity>
                </View>
                {animalList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A0522D',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerTouch:{
        width: 100,
         padding: 10
    }
});