import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProductStore, Product } from '../stores/useProductStore';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const { id } = route.params;
  const { products } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  const handleAddToBag = () => {
    Alert.alert('Added to Bag', `${product?.title} has been added to your bag!`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <Icon key={i} name="star-outline" size={16} color="#E0E0E0" />
      );
    }

    return stars;
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.viewSimilarButton}>
            <Text style={styles.viewSimilarText}>View Similar</Text>
          </TouchableOpacity>

          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(product.rating.rate)}
            </View>
            <Text style={styles.ratingText}>
              {product.rating.rate.toFixed(1)}/5
            </Text>
          </View>

          <Text style={styles.soldBy}>Sold by : {product.brand || 'Essence'}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.discountPercentage && (
              <Text style={styles.originalPrice}>
                ${(product.price * 1.2).toFixed(2)}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.addToBagButton} onPress={handleAddToBag}>
            <Text style={styles.addToBagText}>Add to Bag</Text>
          </TouchableOpacity>

          <View style={styles.highlightsContainer}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            
            <View style={styles.highlightGrid}>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Width</Text>
                <Text style={styles.highlightValue}>15.14</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Height</Text>
                <Text style={styles.highlightValue}>13.08</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Warranty</Text>
                <Text style={styles.highlightValue}>1 week</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Shipping</Text>
                <Text style={styles.highlightValue}>In 3-5 business days</Text>
              </View>
            </View>
          </View>

          <View style={styles.reviewsContainer}>
            <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
            
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.reviewerImage}
                />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>Eleanor Collins</Text>
                  <Text style={styles.reviewerEmail}>eleanor.collins@gmail.com</Text>
                </View>
                <View style={styles.reviewStars}>
                  {renderStars(3)}
                </View>
              </View>
              <Text style={styles.reviewText}>Would not recommend...</Text>
            </View>

            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.reviewerImage}
                />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>Lucas Gordon</Text>
                  <Text style={styles.reviewerEmail}>lucas.gordon@gmail.com</Text>
                </View>
                <View style={styles.reviewStars}>
                  {renderStars(3)}
                </View>
              </View>
              <Text style={styles.reviewText}>Very satisfied!</Text>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#F4D4C7',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    alignItems: 'center',
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  viewSimilarButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#C4767C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  viewSimilarText: {
    color: '#C4767C',
    fontSize: 12,
    fontWeight: '500',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  soldBy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToBagButton: {
    backgroundColor: '#C4767C',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  addToBagText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  highlightsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightItem: {
    width: '48%',
    marginBottom: 15,
  },
  highlightLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  highlightValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewsContainer: {
    marginBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reviewerEmail: {
    fontSize: 12,
    color: '#666',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});