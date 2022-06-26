import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.cinzabackground,
        flex: 1
    },
    infoPosto: {
        backgroundColor: theme.colors.branco,
        width: '100%',
        height: Dimensions.get('window').height / 4,
        padding: 20
    },
    viewImg: {
        backgroundColor: theme.colors.cinza,
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        marginRight: 15
    },
    textPosto: {
        color: theme.colors.cinzaescuro,
        fontFamily: theme.fonts.mon_regular,
        fontSize: 16
    },
    containerComb: {
        backgroundColor: theme.colors.branco,
        marginTop: 15,
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nomeComb: {
        color: theme.colors.cinzaescuro,
        fontFamily: theme.fonts.mon_semibold,
        fontSize: 16
    },
    valorComb: {
        color: theme.colors.verde,
        fontFamily: theme.fonts.mon_semibold,
        fontSize: 16,
        marginRight: 10,
        textAlign: 'right'
    }
});