import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tag, Clock, Gift } from 'lucide-react-native';

export default function OffersScreen() {
  const offers = [
    {
      id: 1,
      title: '50% Off on Beauty Essentials',
      description: 'Get amazing discounts on all beauty products',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '50%',
      validUntil: 'Valid until Dec 31, 2024'
    },
    {
      id: 2,
      title: 'Buy 2 Get 1 Free',
      description: 'On selected makeup items',
      image: 'https://images.pexels.com/photos/1449795/pexels-photo-1449795.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 'B2G1',
      validUntil: 'Valid until Jan 15, 2025'
    },
    {
      id: 3,
      title: 'Free Shipping',
      description: 'On orders above $50',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 'FREE',
      validUntil: 'Valid until ongoing'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Special Offers</Text>
          <Text style={styles.subtitle}>Don't miss out on these amazing deals!</Text>
        </View>

        <View style={styles.offersContainer}>
          {offers.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.offerCard}>
              <Image source={{ uri: offer.image }} style={styles.offerImage} />
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{offer.discount}</Text>
              </View>
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
                <View style={styles.offerFooter}>
                  <View style={styles.validityContainer}>
                    <Clock size={14} color="#666" />
                    <Text style={styles.validityText}>{offer.validUntil}</Text>
                  </View>
                  <TouchableOpacity style={styles.claimButton}>
                    <Gift size={16} color="#FFF" />
                    <Text style={styles.claimButtonText}>Claim</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.emptyOffers}>
          <Tag size={48} color="#C4767C" />
          <Text style={styles.emptyOffersTitle}>More offers coming soon!</Text>
          <Text style={styles.emptyOffersText}>
            We're working on bringing you more exciting deals and discounts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2EF',
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  offersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  offerCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  offerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#C4767C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerContent: {
    padding: 20,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  offerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  validityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  claimButton: {
    backgroundColor: '#C4767C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  claimButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyOffers: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyOffersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyOffersText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});