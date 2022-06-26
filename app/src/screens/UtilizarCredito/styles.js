import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.cinzabackground
    },
    ativarcredito: {
        backgroundColor: theme.colors.branco,
        marginHorizontal: '3%',
        marginVertical: '3%',
        padding: 10,
        height: Dimensions.get('window').height / 1.8,
        borderRadius: 8
    },
    infocredito: {
        height: Dimensions.get('window').height / 3.3,
        padding: 10
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '2%'
    },
    totalcredito: {
        marginVertical: '2%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: theme.fonts.mon_regular,
        color: theme.colors.cinza,
        fontSize: 15
    },
    input: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: theme.colors.cinza,
        marginBottom: 20,
        fontSize: 15,
        color: theme.colors.cinza
    },
    btn: {
        backgroundColor: theme.colors.amarelo,
        width: '100%',
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtbtn: {
        color: theme.colors.branco,
        fontFamily: theme.fonts.raj_bold,
        textTransform: 'uppercase',
        fontSize: 22
    },
    viewcodigo: {
        backgroundColor: theme.colors.branco,
        padding: 15,
        height: Dimensions.get('window').height / 10,
        marginHorizontal: '3%',
        borderRadius: 8,
        justifyContent: 'center'
    },
    txtcod: {
        color: theme.colors.preto,
        fontFamily: theme.fonts.mon_semibold,
        fontSize: 17
    },
    mensagem: {
        color: theme.colors.cinza,
        fontSize: 10,
        fontFamily: theme.fonts.mon_regular,
        marginHorizontal: '4%',
        marginVertical: '2%'
    }
});