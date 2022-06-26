import { StyleSheet, Dimensions, Platform } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    configTela: {
        height: Platform.OS == 'ios' ? Dimensions.get('screen').height / 2.2 : Dimensions.get('screen').height / 3,
        backgroundColor: theme.colors.branco,
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1.5,
        borderTopColor: theme.colors.cinzabackground
    },
    titulo: {
        fontFamily: theme.fonts.mon_semibold,
        color: theme.colors.laranja,
        fontSize: 18,
        marginVertical: '3%'
    },
    input: {
        width: '100%',
        borderBottomWidth: 1.5,
        padding: 10,
        fontSize: 16,
        borderColor: theme.colors.cinza,
        marginVertical: '3%',
        color: theme.colors.cinzaescuro
    },
    viewTotal: {
        flexDirection: 'row',
        padding: 15,
        borderColor: theme.colors.cinza,
        borderWidth: 1.5,
        marginVertical: '2%',
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        color: theme.colors.preto,
        fontSize: 16,
        fontFamily: theme.fonts.mon_semibold,
        marginRight: 15
    },
    totalLitro: {
        color: theme.colors.preto,
        fontSize: 16,
        fontFamily: theme.fonts.mon_regular
    },
    btn: {
        backgroundColor: theme.colors.amarelo,
        borderRadius: 20,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
    textBtn: {
        color: theme.colors.branco,
        fontSize: 20,
        fontFamily: theme.fonts.raj_bold,
        textTransform: 'uppercase'
    }
});