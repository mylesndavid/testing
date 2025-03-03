import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useChallengesStore } from '@/store/challenges-store';
import { ReadingChallenge } from '@/types';
import Button from '@/components/Button';

export default function CreateChallengeScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { addChallenge } = useChallengesStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]);
  
  const isFormValid = title.trim().length > 0 && 
                      description.trim().length > 0 && 
                      parseInt(target) > 0 &&
                      startDate && endDate;
  
  const handleCreateChallenge = () => {
    if (!isFormValid) return;
    
    const newChallenge: ReadingChallenge = {
      id: `challenge-${Date.now()}`,
      title,
      description,
      target: parseInt(target),
      progress: 0,
      startDate,
      endDate,
      isCompleted: false,
    };
    
    addChallenge(newChallenge);
    router.back();
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.text }]}>Challenge Title</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.card, 
                color: colors.text,
                borderColor: colors.border,
              }
            ]}
            placeholder="e.g., Summer Reading Challenge"
            placeholderTextColor={colors.secondaryText}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[
              styles.textArea, 
              { 
                backgroundColor: colors.card, 
                color: colors.text,
                borderColor: colors.border,
              }
            ]}
            placeholder="Describe your challenge..."
            placeholderTextColor={colors.secondaryText}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.text }]}>Target (Number of Books)</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.card, 
                color: colors.text,
                borderColor: colors.border,
              }
            ]}
            placeholder="e.g., 10"
            placeholderTextColor={colors.secondaryText}
            value={target}
            onChangeText={setTarget}
            keyboardType="number-pad"
          />
        </View>
        
        <View style={styles.dateSection}>
          <View style={styles.dateContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Start Date</Text>
            <View style={[
              styles.dateInput, 
              { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
              }
            ]}>
              <Calendar size={18} color={colors.secondaryText} />
              <TextInput
                style={[styles.dateTextInput, { color: colors.text }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.secondaryText}
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
          </View>
          
          <View style={styles.dateContainer}>
            <Text style={[styles.label, { color: colors.text }]}>End Date</Text>
            <View style={[
              styles.dateInput, 
              { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
              }
            ]}>
              <Calendar size={18} color={colors.secondaryText} />
              <TextInput
                style={[styles.dateTextInput, { color: colors.text }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.secondaryText}
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.submitSection}>
          <Button
            title="Create Challenge"
            onPress={handleCreateChallenge}
            variant="primary"
            disabled={!isFormValid}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateContainer: {
    width: '48%',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  dateTextInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  submitSection: {
    marginTop: 10,
    marginBottom: 16,
  },
});