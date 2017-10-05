import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {List, ListItem, Icon} from 'react-native-elements'
import {fakeList} from './mockList'
import style from './Style';

class ListComponent extends Component {
  render() {
    return (
      <ScrollView>
        <List containerStyle={style.listContainer}>
          {
            fakeList.map((item, key) => (
              <ListItem
                key={key}
                title={item.title}
                titleNumberOfLines={2}
                titleStyle={style.itemTitle}
                onPress={() => {this.props.navigate('Details', item)}}
                subtitle={
                  <View style={style.itemContainer}>
                    <Image source={{uri: item.img}} style={{height: 100, width: 100}}/>
                    <View style={{flexDirection: 'column', paddingLeft: 15}}>
                      <Text style={{marginTop: 10, color: 'grey'}}>
                        <Icon
                          name='query-builder'
                          style={{height: 10, width: 23, marginTop: -3}}
                          size={18}
                          color='grey'
                        />
                        {item.date}
                      </Text>
                      <Text style={{marginTop: 10, color: 'grey', width: 230}}>
                        <Icon
                          name='room'
                          style={{height: 10, width:23, marginTop: -3}}
                          size={18}
                          color='grey'
                        />
                        {item.location.address}
                      </Text>
                    </View>
                  </View>
                }
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

export default ListComponent;