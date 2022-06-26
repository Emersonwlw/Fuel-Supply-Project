import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.cinzabackground,
        flex: 1
    },
    btnUtilizar: {
        backgroundColor: theme.colors.amarelo,
        padding: Platform.OS === 'ios' ? 10 : 8,
        marginVertical: '3%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%'
    },
    txtBtn: {
        color: theme.colors.branco,
        fontFamily: theme.fonts.raj_bold,
        textTransform: 'uppercase',
        fontSize: 19
    },
    containerCredito: {
        backgroundColor: theme.colors.branco,
        marginVertical: '1.5%',
        marginHorizontal: '3%',
        padding: 20,
        borderRadius: 5
    },
    txtTitulo: {
        color: theme.colors.laranja,
        fontFamily: theme.fonts.mon_semibold,
        fontSize: 18,
        marginBottom: '4%'
    },
    txtInfo: {
        marginTop: 10,
        fontFamily: theme.fonts.mon_regular,
        fontSize: 16,
        color: theme.colors.cinzaescuro
    },
    br: {
        marginTop: '6%'
    },
    picker: {
        color: theme.colors.cinzaescuro,
        fontFamily: theme.fonts.mon_semibold
    }
});
