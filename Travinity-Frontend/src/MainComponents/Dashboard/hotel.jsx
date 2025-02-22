import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHotel,
  faLocationDot,
  faStar,
  faBed,
  faUser,
  faChild,
  faMoneyBill,
  faSpinner,
  faFilter,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import NavForSeperate from './NavForSeperate';

const Hotel = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [searchState, setSearchState] = useState({
    destination: location.state?.original?.destination || '',
    destId: location.state?.converted?.destId || '',
    searchType: location.state?.converted?.searchType || '',
    checkInDate: location.state?.original?.checkInDate || '',
    checkOutDate: location.state?.original?.checkOutDate || '',
    rooms: location.state?.original?.rooms || 1,
    adults: location.state?.original?.adults || 2,
    children: location.state?.original?.children || 0,
  });

  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    if (location.state?.converted) {
      handleAutoSearch();
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [hotels, priceRange, selectedStars, selectedAmenities]);

  const handleAutoSearch = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:8080/searchHotels`, {
        params: {
          destId: searchState.destId,
          searchType: searchState.searchType,
          arrivalDate: searchState.checkInDate,
          departureDate: searchState.checkOutDate,
          adults: searchState.adults,
          roomQty: searchState.rooms,
          childrenAge: "0,17",
          pageNumber: 1
        }
      });

      const hotelData = response.data.data.hotels.map(item => ({
        id: item.property.id,
        name: item.property.name,
        stars: item.property.accuratePropertyClass || 0,
        rating: item.property.reviewScore || 0,
        reviewCount: item.property.reviewCount || 0,
        reviewWord: item.property.reviewScoreWord || '',
        mainPhoto: item.property.photoUrls[0],
        address: `${item.property.wishlistName}`,
        price: {
          amount: item.property.priceBreakdown.grossPrice.value,
          currency: item.property.priceBreakdown.grossPrice.currency
        },
        checkIn: item.property.checkin,
        checkOut: item.property.checkout,
        isPreferred: item.property.isPreferred || false,
        latitude: item.property.latitude,
        longitude: item.property.longitude
      }));

      setHotels(hotelData);
      setFilteredHotels(hotelData);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatHotelData = (hotel) => {
    return {
      id: hotel.hotel_id,
      name: hotel.hotel_name,
      address: hotel.address,
      stars: hotel.stars || 0,
      rating: hotel.review_score || 0,
      reviewCount: hotel.review_count || 0,
      reviewWord: hotel.review_score_word || '',
      mainPhoto: hotel.main_photo_url,
      amenities: hotel.amenities || [],
      description: hotel.description || '',
      roomTypes: hotel.room_types || [],
      bookingLink: hotel.url,
    };
  };

  const applyFilters = () => {
    let filtered = [...hotels];

    // Filter by price
    filtered = filtered.filter(hotel => hotel.price.amount <= priceRange);

    // Filter by stars
    if (selectedStars.length > 0) {
      filtered = filtered.filter(hotel => selectedStars.includes(hotel.stars));
    }

    setFilteredHotels(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleAutoSearch();
  };

  const fetchHotelDestinations = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8080/searchDestinations`, {
        params: {
          query: query,
          limit: 5
        }
      });

      const destinations = response.data.data.destinations.map((destination) => ({
        id: destination.id,
        name: destination.name,
        country: destination.country,
        type: destination.type
      }));

      setDestinationSuggestions(destinations);
    } catch (error) {
      console.error('Error fetching hotel destinations:', error);
      setError('Failed to fetch hotel destinations. Please try again.');
    }
  };

  const handleGuestChange = (e) => {
    const [rooms, adults, children] = e.target.value.split(',');
    setSearchState(prev => ({
      ...prev,
      rooms: Number(rooms),
      adults: Number(adults),
      children: Number(children)
    }));
  };

  return (
    <>
      <NavForSeperate />
      <section className="py-6 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Section */}
            <div className="w-full md:w-1/4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Filters</h2>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (up to ${priceRange})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Star Rating Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Star Rating</h3>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star} className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedStars.includes(star)}
                        onChange={() => {
                          setSelectedStars(prev =>
                            prev.includes(star)
                              ? prev.filter(s => s !== star)
                              : [...prev, star]
                          );
                        }}
                        className="form-checkbox"
                      />
                      <span>{star} Stars</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Hotel Results */}
            <div className="w-full md:w-3/4">
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  {/* Destination Search */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchState.destination}
                      onChange={(e) => {
                        setSearchState(prev => ({...prev, destination: e.target.value}));
                        fetchHotelDestinations(e.target.value);
                      }}
                      placeholder="Where are you going?"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                    {destinationSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">
                        {destinationSuggestions.map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSearchState(prev => ({
                                ...prev,
                                destination: suggestion.name,
                                destId: suggestion.id,
                                searchType: suggestion.type
                              }));
                              setDestinationSuggestions([]);
                            }}
                          >
                            {suggestion.name}, {suggestion.country}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Check-in Date */}
                    <input
                      type="date"
                      value={searchState.checkInDate}
                      onChange={(e) => setSearchState(prev => ({...prev, checkInDate: e.target.value}))}
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />

                    {/* Check-out Date */}
                    <input
                      type="date"
                      value={searchState.checkOutDate}
                      onChange={(e) => setSearchState(prev => ({...prev, checkOutDate: e.target.value}))}
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />

                    {/* Guests Selection */}
                    <select
                      value={`${searchState.rooms},${searchState.adults},${searchState.children}`}
                      onChange={handleGuestChange}
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    >
                      <option value="1,2,0">1 Room, 2 Adults</option>
                      <option value="1,2,1">1 Room, 2 Adults, 1 Child</option>
                      <option value="1,2,2">1 Room, 2 Adults, 2 Children</option>
                      <option value="2,4,0">2 Rooms, 4 Adults</option>
                    </select>

                    {/* Search Button */}
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 p-3 rounded-lg hover:shadow-xl transition flex items-center justify-center gap-2 font-semibold"
                    >
                      <FontAwesomeIcon icon={faSearch} />
                      Search Hotels
                    </button>
                  </div>
                </form>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
              ) : error ? (
                <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">{error}</div>
              ) : (
                <div className="grid gap-6">
                  {filteredHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow mb-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Hotel Image */}
                        <div className="w-full md:w-1/4 flex-shrink-0">
                          <div className="relative h-48 rounded-lg overflow-hidden">
                            <img
                              src={hotel.mainPhoto}
                              alt={hotel.name}
                              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                            {hotel.isPreferred && (
                              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                                Preferred Property
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Hotel Details */}
                        <div className="w-full md:w-3/4">
                          {/* Header with Name and Price */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">{hotel.name}</h3>
                              <p className="text-gray-600 flex items-center gap-2 mt-1">
                                <FontAwesomeIcon icon={faLocationDot} />
                                {hotel.address}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-green-600">
                                {hotel.price.currency} {hotel.price.amount.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">per night</p>
                            </div>
                          </div>

                          {/* Rating and Stars Section */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                              {[...Array(hotel.stars)].map((_, i) => (
                                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                              ))}
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              {hotel.rating.toFixed(1)}/10 • {hotel.reviewWord}
                            </div>
                            <div className="text-gray-600">
                              {hotel.reviewCount.toLocaleString()} reviews
                            </div>
                          </div>

                          {/* Additional Info Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm mb-6">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faBed} className="text-indigo-500" />
                              <div>
                                <p className="font-semibold text-gray-600">Room Type</p>
                                <p className="text-gray-800">Standard Room</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faUser} className="text-red-500" />
                              <div>
                                <p className="font-semibold text-gray-600">Guests</p>
                                <p className="text-gray-800">{searchState.adults} Adults, {searchState.children} Children</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faHotel} className="text-blue-500" />
                              <div>
                                <p className="font-semibold text-gray-600">Property Class</p>
                                <p className="text-gray-800">{hotel.stars}-Star Hotel</p>
                              </div>
                            </div>
                          </div>

                          {/* Book Now Button */}
                          <div className="flex justify-end items-center border-t pt-4">
                            <button
                              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-6 py-3 rounded-lg hover:shadow-xl transition flex items-center gap-2 text-lg font-semibold"
                              onClick={() => window.open(hotel.bookingLink, '_blank')}
                            >
                              <FontAwesomeIcon icon={faMoneyBill} />
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hotel;
