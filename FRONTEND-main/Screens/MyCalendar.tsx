// ✅ Updated MyCalendar.tsx with dynamic token loading and clean error handling
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface MyCalendarProps {
  onDateSelect?: (date: string) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onDateSelect = () => {} }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(today.toISOString().split('T')[0]);
  const [loggedDates, setLoggedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedDates = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found. Please log in again.');
          setLoading(false);
          return;
        }

        const res = await fetch('http://192.168.1.119:5000/api/seizures/logged-days', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log('📦 Logged Dates Response:', data);

        if (data && Array.isArray(data.loggedDates)) {
          setLoggedDates(data.loggedDates);
        } else {
          Alert.alert('Notice', 'No logged dates found');
          setLoggedDates([]);
        }
      } catch (error) {
        console.error('❌ Failed to fetch seizure days:', error);
        Alert.alert('Error', 'Failed to fetch seizure data');
        setLoggedDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedDates();
  }, []);

  const onDayPress = (day: any) => {
    if (new Date(day.dateString) > today) return;
    if (loggedDates.includes(day.dateString)) return;
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString);
  };

  const markedDates: Record<string, any> = {};

  if (loggedDates && Array.isArray(loggedDates)) {
    for (const date of loggedDates) {
      markedDates[date] = {
        customStyles: {
          container: { backgroundColor: '#ccc', borderRadius: 16 },
          text: { color: '#888' },
        },
        disabled: true,
        disableTouchEvent: true,
      };
    }
  }

  if (selectedDate && !loggedDates.includes(selectedDate)) {
    markedDates[selectedDate] = {
      customStyles: {
        container: { backgroundColor: '#6B2A88', borderRadius: 16 },
        text: { color: 'white', fontWeight: 'bold' },
      },
    };
  }

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  if (loading) return <ActivityIndicator size="large" color="#6B2A88" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Text style={styles.monthText}>
          {new Date(currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()}
        </Text>
      </View>

      <View style={styles.weekDayContainer}>
        {weekDays.map((day) => (
          <View key={day} style={styles.dayBox}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.calendarFrame}>
        <Calendar
          current={currentMonth}
          maxDate={today.toISOString().split('T')[0]}
          onDayPress={onDayPress}
          markedDates={markedDates || {}}
          markingType="custom"
          hideExtraDays={true}
          theme={{
            backgroundColor: '#EABAFF',
            calendarBackground: '#EABAFF',
            dayTextColor: 'black',
            textSectionTitleColor: 'transparent',
            textDayFontSize: 18,
            monthTextColor: '#6B2A88',
            arrowColor: '#6B2A88',
          }}
          renderHeader={() => <></>}
          onMonthChange={(month) => setCurrentMonth(month.dateString)}
          style={{ width: width - 30 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B2A88',
  },
  weekDayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 30,
    marginBottom: 5,
    paddingHorizontal: 2,
  },
  dayBox: {
    flex: 1,
    backgroundColor: '#6B2A88',
    borderRadius: 20,
    marginHorizontal: 2,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  calendarFrame: {
    borderWidth: 3,
    borderColor: '#6B2A88',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#EABAFF',
  },
});

export default MyCalendar;
