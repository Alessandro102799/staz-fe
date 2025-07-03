import { View, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import FootballIcon from '../assets/icons/football.svg';
import BasketIcon from '../assets/icons/basket.svg';
import TennisIcon from '../assets/icons/tennis.svg';
import OtherIcon from '../assets/icons/other.svg';
import Info from "../components/Info";
import Budget from "../components/Budget";
import colors from "../shared/constants/colors";
import NumberIcon from '../assets/icons/number.svg';
import { capitalizeFirstLetter } from "../shared/utility/letter";
import { BetResult } from "../shared/enum/result.enum";
import { useForm, Controller } from "react-hook-form";
import { betFormDefaultValue, IBet } from "../components/form/bet";
import useCreateBet from "../api/bet/useCreateBet";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TabParamList } from "../components/Menu";
import calculateStake from "../shared/utility/calculateStake";
import useGetUser from "../api/user/useGetUser";
import useGetById from "../api/bet/useGetById";
import { BetModel } from "../shared/model/bet.model";
import useUpdateBet from "../api/bet/useUpdateBet";

// importa già tutto correttamente, nessun cambio qui
type EditBetRouteProp = RouteProp<TabParamList, 'EditBet'>;
export default function BetScreen() {
    // Update
    const route = useRoute<RouteProp<TabParamList, 'EditBet' | 'NewBet'>>();
    const id = route.params?.id;

    const { user, loading, error } = useGetUser();
    const { bet: bet, loading: loadingBet, error: errorBet } = useGetById(id ?? 0);
    
    const options = ["football", "basket", "tennis", "other"];
    const optionsType = ["double", "multiple", "live"];
    const result = ["pending", "win", "loss"];

    const [showCalculation, setShowCalculation] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
  
    const { control, handleSubmit, setValue, watch, reset } = useForm<IBet>({ defaultValues: betFormDefaultValue});

    const updateForm = (bet: BetModel) => {
        if(bet) {
            setValue('data', bet.data);
            setValue('amount', bet.amount),
            setValue('possibleWin', bet.possibleWin),
            setValue('quote', bet.quote),
            setValue('result', bet.result),
            setValue('sport', bet.sport),
            setValue('stake', bet.stake),
            setValue('type', bet.type)
        }
    }

    useEffect(() => {
        if(id) {
            if(bet) {
                setShowCalculation(true);
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
                updateForm(bet)
            }
        } else {
            setShowCalculation(false)
            reset(betFormDefaultValue)
        }
    }, [bet])

    const handleGenerateStake = () => {
        setShowCalculation(true);
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        const calculate = calculateStake(watch('quote'), user?.initialBudget ? user.initialBudget : 0);        
        setValue('amount', (calculate?.amount ?? 0));
        setValue('possibleWin', Number((calculate?.possibleWin ?? 0).toFixed(2)));
        setValue('stake', (calculate?.stake ?? 0));
    };
  
    const onSubmit = async (data: IBet) => {
        if(data.amount === 0 || data.quote === 0 || data.stake === 0 || data.possibleWin === 0) {
            alert("Some fields I don't know valid");
        } else if(!id){
            try {
                useCreateBet(data);
                alert('Bet create successfully!');
                reset();
                setShowCalculation(false)
            } catch (err) {
                alert('Error bet create!');
                console.error("API Error:", err);
            }
        } else if(bet) {
            try {
                useUpdateBet(data, bet.id ?? 0);
                alert('Bet update successfully!');
                reset();
                setShowCalculation(false)
            } catch (err) {
                alert('Error bet create!');
                console.error("API Error:", err);
            }
        }
    };
  
    const handleSelect = (index: number) => {
      setValue("sport", options[index]);
    };
  
    const handleSelectType = (index: number) => {
      setValue("type", optionsType[index]);
    };
  
    const handleSelectResult = (index: number) => {
      setValue("result", result[index]);
    };
  
    const getSportIcon = (label: string) => {
      switch (label) {
        case "football":
          return <FootballIcon width={18} height={18} />;
        case "basket":
          return <BasketIcon width={18} height={18} />;
        case "tennis":
          return <TennisIcon width={18} height={18} />;
        case "other":
        default:
          return <OtherIcon width={18} height={18} />;
      }
    };
  
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Info />
            <Budget />
            {/* Sport */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: colors.super_light_gray, borderRadius: 50 }}>
            {options.map((label, index) => {
                const isSelected = watch("sport") === label;
                return (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleSelect(index)}
                    style={[
                    styles.option,
                    index === 0 ? styles.left : index === options.length - 1 ? styles.right : null,
                    isSelected && styles.selected,
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    {getSportIcon(label)}
                    <Text style={[styles.text, isSelected && styles.selectedText]}>{label}</Text>
                    </View>
                </TouchableOpacity>
                );
            })}
            </View>
    
            {/* Type */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10, backgroundColor: colors.super_light_gray, borderRadius: 50 }}>
            {optionsType.map((label, index) => {
                const isSelected = watch("type") === label;
                return (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectType(index)}
                    style={[
                    styles.optionType,
                    index === 0 ? styles.left : index === optionsType.length - 1 ? styles.right : null,
                    isSelected && styles.selected,
                    ]}
                >
                    <Text style={[styles.text, isSelected && styles.selectedText]}>{capitalizeFirstLetter(label)}</Text>
                </TouchableOpacity>
                );
            })}
            </View>
    
            {/* Quote */}
            <View style={styles.boxTextInput}>
            <NumberIcon />
            <View style={styles.separator} />
            <Controller
                control={control}
                name="quote"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <TextInput
                    style={[styles.input, {width: '100%'}]}
                    placeholder="Insert quote"
                    placeholderTextColor={colors.light_gray}
                    keyboardType="decimal-pad" // Per inserire il punto
                    value={value !== undefined ? value.toString() : ''}
                    onChangeText={(val) => {
                        // Permetti virgola o punto nell'input
                        const sanitized = val.replace(',', '.');

                        // Accetta solo numeri validi o stringa vuota (evita NaN a metà digitazione)
                        if (sanitized === '' || /^-?\d*\.?\d*$/.test(sanitized)) {
                        onChange(sanitized);
                        }
                    }}
                    />
                )}
            />
            </View>
    
            <TouchableOpacity style={styles.saveButton} onPress={handleGenerateStake}>
            <Text style={styles.saveButtonText}>Generate stake (%)</Text>
            </TouchableOpacity>
    

            {showCalculation && (
                <Animated.View
                    style={[
                        {
                            opacity: slideAnim,
                            transform: [{
                                translateY: slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [50, 0],
                                }),
                            }],
                        }
                    ]}
                >
                {/* Stake + Amount */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={[styles.boxTextInput, { width: "49%" }]}>
                        <Text style={{ fontSize: 12, color: colors.green, fontFamily: "Montserrat-SemiBold" }}>Stake</Text>
                        <View style={styles.separator} />
                        <Controller
                            control={control}
                            name="stake"
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextInput
                                            style={styles.input}
                                            placeholderTextColor={colors.light_gray}
                                            keyboardType="decimal-pad" // Per inserire il punto
                                            value={value !== undefined ? value.toString() : ''}
                                            onChangeText={(val) => {
                                                // Permetti virgola o punto nell'input
                                                const sanitized = val.replace(',', '.');

                                                // Accetta solo numeri validi o stringa vuota (evita NaN a metà digitazione)
                                                if (sanitized === '' || /^-?\d*\.?\d*$/.test(sanitized)) {
                                                    onChange(sanitized);
                                                }
                                            }}
                                        />
                                        <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14}}>%</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
        
                    <View style={{ width: "49%" }}>
                        <View style={[styles.boxTextInput]}>
                        <Text style={{ fontSize: 12, color: colors.green, fontFamily: "Montserrat-SemiBold" }}>Amount</Text>
                        <View style={styles.separator} />
                        <Controller
                            control={control}
                            name="amount"
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextInput
                                            style={styles.input}
                                            placeholderTextColor={colors.light_gray}
                                            keyboardType="decimal-pad" // Per inserire il punto
                                            value={value !== undefined ? value.toString() : ''}
                                            onChangeText={(val) => {
                                                // Permetti virgola o punto nell'input
                                                const sanitized = val.replace(',', '.');

                                                // Accetta solo numeri validi o stringa vuota (evita NaN a metà digitazione)
                                                if (sanitized === '' || /^-?\d*\.?\d*$/.test(sanitized)) {
                                                    onChange(sanitized);
                                                }
                                            }}
                                        />
                                        <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14}}>€</Text>
                                    </View>
                                )
                            }}
                        />
                        </View>
                        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 12, color: colors.light_gray }}>edit the amount if you want</Text>
                    </View>
                </View>
        
                {/* Possible Win */}
                <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={[styles.boxTextInput]}>
                        <Text style={{ fontSize: 12, color: colors.green, fontFamily: "Montserrat-SemiBold" }}>Possible Win</Text>
                        <View style={styles.separator} />
                        <Controller
                            control={control}
                            name="possibleWin"
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 0.5}}>
                                        <TextInput
                                            style={styles.input}
                                            placeholderTextColor={colors.light_gray}
                                            keyboardType="decimal-pad" // Per inserire il punto
                                            value={value !== undefined ? value.toString() : ''}
                                            onChangeText={(val) => {
                                                // Permetti virgola o punto nell'input
                                                const sanitized = val.replace(',', '.');

                                                // Accetta solo numeri validi o stringa vuota (evita NaN a metà digitazione)
                                                if (sanitized === '' || /^-?\d*\.?\d*$/.test(sanitized)) {
                                                    onChange(sanitized);
                                                }
                                            }}
                                        />
                                        <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14}}>€</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 12, color: colors.light_gray }}>changes the possible winnings if there are bonuses</Text>
                </View>
        
                {/* Result */}
                <View style={{ justifyContent: "space-around", marginTop: 10, flexDirection: "row", backgroundColor: colors.super_light_gray, borderRadius: 50 }}>
                {result.map((label, index) => {
                    const isSelected = watch("result") === label;
                    return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectResult(index)}
                        style={[
                        styles.optionType,
                        index === 0 ? styles.left : index === result.length - 1 ? styles.right : null,
                        isSelected && (label === BetResult.PENDING ? styles.selectedPending : label === BetResult.WIN ? styles.selectedWin : styles.selectedLoss),
                        ]}
                    >
                        <Text
                        style={[
                            styles.text,
                            isSelected &&
                            (label === BetResult.PENDING
                                ? styles.selectedTextPending
                                : label === BetResult.WIN
                                ? styles.selectedTextWin
                                : styles.selectedTextLoss),
                        ]}
                        >
                        {capitalizeFirstLetter(label)}
                        </Text>
                    </TouchableOpacity>
                    );
                })}
                </View>
        
                {/* Submit */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.saveButtonText}>{id ? "Save " : "Create"}</Text>
                </TouchableOpacity>
            </Animated.View>
            )}
        </View>
    </TouchableWithoutFeedback>
    );
}
  
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: colors.background
    },

    //option for select all, in progress, last week, last month
    option: {
        paddingVertical: 10,
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center',
    },

    optionType: {
        paddingVertical: 10,
        width: "33.3%",
        justifyContent: 'center',
        alignItems: 'center',
    },

    left: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },

    right: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },

    selected: {
        backgroundColor: colors.light_black,
        borderRadius: 50,
    },

    text: {
        color: colors.light_gray,
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
    },

    selectedText: {
        color: 'white',
    },

    //input
    boxTextInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.super_light_gray, // colore sfondo come da screenshot
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 30,
        marginTop: 10,
    },

    separator: {
        width: 1,
        height: 20,
        backgroundColor: colors.white,
        marginRight: 10,
        marginLeft: 10,
    },

    input: {
        fontSize: 14,
        color: colors.black,
        fontFamily: 'Montserrat-SemiBold',
    },

    //button generate and create
    saveButton: {
        backgroundColor: colors.black,
        width: '100%',
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
    },

    saveButtonText: {
        color: colors.white,
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },

    //result

    selectedPending: {
        backgroundColor: colors.light_blue,
        borderRadius: 50,
    },

    selectedTextPending: {
        color: colors.blue,
        fontFamily: 'Montserrat-SemiBold'
    },

    selectedWin: {
        backgroundColor: colors.light_green,
        borderRadius: 50,
    },

    selectedTextWin: {
        color: colors.green,
        fontFamily: 'Montserrat-SemiBold'
    },

    selectedLoss: {
        backgroundColor: colors.light_red,
        borderRadius: 50,
    },

    selectedTextLoss: {
        color: colors.red,
        fontFamily: 'Montserrat-SemiBold'
    },

    //prova 
    prefix: {
        paddingHorizontal: 5,
        fontWeight: 'bold',
    }
})