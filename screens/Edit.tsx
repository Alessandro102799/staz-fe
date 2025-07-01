import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import colors from '../shared/constants/colors';
import Info from '../components/Info';
import UserInputIcon from '../assets/icons/user-input-icon.svg';
import EuroInputIcon from '../assets/icons/euro-icon.svg';
import useGetUser from '../api/user/useGetUser';
import useUpdateUser from '../api/user/useUpdateUser';
import { useState } from 'react';
import { IUser, userFormDefaultValue } from '../components/form/user';
import { UserModel } from '../shared/model/user.model';

export default function Edit() {
  const { user, loading, error } = useGetUser();

  //      const getDefaultValues = (value?: UserModel): IUser => {
  //         return value === null ? userFormDefaultValue : fromUserToIUser(value);
  //     };

  //     const { control, handleSubmit, formState } = useForm<IUser>({
  //         mode: 'all',
  //         defaultValues: { ...getDefaultValues(currentUser) },
  //     });

  //   const { userToUpdate, setUserToUpdate } = useState();
  //   const handleSave = (): => {
  //     useUpdateUser();
  //   };

  return (
    user && (
      <View style={styles.container}>
        <Info />
        <View
          style={{
            width: '100%',
            height: '5%',
          }}
        >
          <View style={styles.inputRow}>
            <UserInputIcon />
            <View style={styles.separator} />
            <TextInput
              style={styles.input}
              placeholder="Change username"
              placeholderTextColor={colors.light_grey}
            ></TextInput>
          </View>

          <View style={styles.inputRow}>
            <EuroInputIcon />
            <View style={styles.separator} />
            <TextInput
              style={styles.input}
              placeholder="Insert initial budget"
              placeholderTextColor={colors.light_grey}
            ></TextInput>
          </View>

          <View style={styles.inputRow}>
            <EuroInputIcon />
            <View style={styles.separator} />
            <TextInput
              style={styles.input}
              placeholder="Insert goal budget"
              placeholderTextColor={colors.light_grey}
            ></TextInput>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => console.log('')}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.background,
  },

  editContainer: {
    width: '100%',
    height: '35%',
  },

  input: {
    flex: 1,
    color: colors.black,
    fontSize: 18,
    marginLeft: 5,
  },

  inputRow: {
    width: '100%',
    height: '90%',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 8,
    backgroundColor: colors.super_light_grey,
    borderColor: colors.super_light_grey,
  },

  separator: {
    width: 1,
    height: '70%',
    backgroundColor: colors.white,
    marginHorizontal: '3%',
  },

  saveButton: {
    backgroundColor: colors.black,
    width: '100%',
    height: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    marginVertical: 8,
  },

  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
});
