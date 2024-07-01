import * as React from 'react';
import { Button, View, Text ,ImageBackground} from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <View>
    <ImageBackground source={require('../assets/home.png')}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        
            <Text>Profile Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Home')}
      />
    
      
    </View>
    </ImageBackground>
    </View>
  );
}

export default ProfileScreen;