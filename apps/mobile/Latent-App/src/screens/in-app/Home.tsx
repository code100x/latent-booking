import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { THEME } from '../../utils/colors';
import { useUI } from '../../context/UIContext';
import Banner from '../../components/Banner';
import { ChevronRight, Lock, LockIcon } from 'lucide-react-native';
import CustomText from '../../components/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home = () => {
  const { theme } = useUI();
  return (
    <FlatList
      data={['0']}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: THEME[theme].background, padding: 16, paddingTop: 0 }}
      renderItem={() => (
        <View style={{ flex: 1, gap: 0 }}>
          <Banner />
            <TouchableOpacity style={styles.sectionHeader}>
              <CustomText style={styles.sectionTitle}>Latent+ Episodes</CustomText>
              <ChevronRight color="#fff" size={20} />
            </TouchableOpacity>

          <FlatList
            horizontal
            data={[1, 2]}
            contentContainerStyle={{ gap: 24 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View key={item} style={styles.episodeCard}>
                <MaterialCommunityIcons color="#FFD700" size={24} style={styles.lockIcon} name="lock-outline" />
                <Image
                  source={require('../../assets/images/latentshow.jpg')}
                  style={styles.episodeImage}
                  resizeMode="contain"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,0.2)']}
                  style={styles.gradient}
                />

                <CustomText style={styles.episodeTitle} numberOfLines={2}>
                  India's Got Latent ft. @Ashish Chanchalani, @Beer Biceps...
                </CustomText>
              </View>
            )}
          />
          <View style={{ marginVertical: '5%', marginTop:30 }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <CustomText style={{ color: '#CECDCC', fontFamily: 'Manrope_800ExtraBold', fontSize: RFValue(16) }}>
                All Episodes
              </CustomText>
              <ChevronRight color="#fff" size={20} />
            </TouchableOpacity>
            <FlatList
              horizontal
              data={[1, 2]}
              contentContainerStyle={{ gap: 24 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View key={item} style={styles.episodeCard}>
                  <Image
                    source={require('../../assets/images/latentshow.jpg')}
                    style={styles.episodeImage}
                    resizeMode="contain"
                  />
                  <CustomText style={styles.episodeTitle} numberOfLines={2}>
                    India's Got Latent ft. @Ashish Chanchalani, @Beer Biceps...
                  </CustomText>
                </View>
              )}
            />
          </View>
        </View>
      )}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  section: {
    // marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    marginTop:20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 12,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: '100%',
  },

  sectionTitle: {
    color: '#F8D48D',
    fontSize: RFValue(16),
    fontFamily: 'Manrope_700Bold',
  },
  episodeCard: {
    width: 200,
    // marginLeft: 16,
    position: 'relative',
  },

  lockIcon: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    zIndex: 1,
  },
  episodeImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  episodeTitle: {
    color: '#fff',
    fontSize: RFValue(14),
    marginVertical: 4,
  },
});
