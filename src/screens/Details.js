import * as React from 'react';
import { Text, View, Image, Button, Alert } from 'react-native';

function Details({ route }) {
  const photo = route.params.photo;
  var [ingredients, set_ingredients] = React.useState('');
  var [uploaded_image, set_uploaded_image] = React.useState('');

  upload_image_on_imgur = async (image_data) => {
    var myHeaders = new Headers();
    myHeaders.append("Token", "Bearer 5eeae49394cd929e299785c8805bd168fc675280");
    myHeaders.append("Authorization", "Client-ID 1aa69a3cdc44298");
    myHeaders.append("Content-Type", "multipart/form-data");

    var formdata = new FormData();
    formdata.append("image", image_data);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_uploaded_image(result.data.link)
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  extract_ingredients = async (image_url) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");

    var formdata = new FormData();
    formdata.append("img_path", image_url);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch("http://157.245.198.11/app/extract-ingredients/?img_path=" + image_url, requestOptions)
      .then(response => {
        response.json()
        console.log(response.status)
      })
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{
          width: photo.width / 10,
          height: photo.height / 10
        }}
        source={{
          uri: photo.uri,
        }}
      />
      <Button
        title='Upload image to Imgur'
        onPress={() => {
          upload_image_on_imgur(photo.base64)
        }}
      />
      <Button
        title='Extract ingredients'
        onPress={() => {
          extract_ingredients(uploaded_image)
        }}
      />
      <Text>{ingredients}</Text>
    </View>
  );
}

export default Details;