import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {ActivityIndicator} from 'antd-mobile';
import List from '../List/List';
import {foundPostRef} from '../../firebaseConfig';
import httpRequest from '../../library/httpRequest';
import style from './Style'

class FoundPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Found Posts',
    headerRight: <Icon
      name='add-circle'
      color='#e91e63'
      size={35}
      containerStyle={style.navigationContainerStyle}
      onPress={() => navigation.navigate('PostForm', {
        lostOrFound: 2
      })}
    />,
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/images/item.png')}
        style={{tintColor: tintColor}}
      />
    )
  });

  state = {
    loading: true,
    list: [],
    keyword: '',
    location: '',
    date: '',
    category: ''
  }

  componentDidMount() {
    this.refreshPostlist();
  }

  refreshPostlist = () => {
    this.setState({
      loading: true,
      list: []
    });
    const {date, location, keyword, category} = this.state
    httpRequest(2, {date, location, keyword, category}, (post) => {
      this.setState({
        loading: false,
        list: post
      });
    })
  }

  searchUpdatedCallback = (newState) => {
    const {
      keyword,
      location,
      date
    } = newState;
    this.setState({
      keyword,
      location,
      date
    }, () => {
      this.refreshPostlist();
    });
  }

  _onSearchPress = () => {
    const {navigate} = this.props.navigation;
    const {
      navigation,
      keyword,
      date,
      location,
    } = this.state;
    navigate('Search', {
      keyword,
      date,
      location,
      searchUpdatedCallback: this.searchUpdatedCallback
    })
  };

  render() {
    const {navigate} = this.props.navigation;
    const loadingOrList = this.state.loading 
      ? <View style={style.fetchStyle}>
          <ActivityIndicator animating text='Fetching Items'/>
        </View>
      : <List navigate={navigate} list={this.state.list} />
    return (
      <View style={style.containerStyle}>
        <View style={style.searchButtonContainerStyle}>
          <Button
            iconLeft
            icon={{name: 'search', size: 26}}
            title='Search'
            fontWeight={'500'}
            containerViewStyle={style.containerViewStyle}
            buttonStyle={style.buttonStyle}
            onPress={() => this.props.navigation.navigate('TemSearch')}
            borderRadius={50}
          />
        </View>
        <View style={style.listContainerStyle}>
          {loadingOrList}
        </View>
      </View>
    );
  }
}

export default FoundPostsScreen;