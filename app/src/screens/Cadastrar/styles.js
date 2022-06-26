import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.cinzaescuro
    },
    margem: {
        height: '20%'
    },
    cadastrar: {
        backgroundColor: theme.colors.branco,
        height: '80%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 35
    },
    titulo: {
        color: theme.colors.laranja,
        fontFamily: theme.fonts.mon_semibold,
        fontSize: 26,
        marginBottom: 13
    },
    subtitulo: {
        fontSize: 17,
        fontFamily: theme.fonts.mon_regular,
        color: theme.colors.cinza,
        marginBottom: 46
    },
    input: {
        borderBottomWidth: 2,
        fontSize: 16,
        borderBottomColor: '#B6B9B8',
        padding: 10,
        marginBottom: 5,
        color: theme.colors.cinza
    },
    btn: {
        marginTop: 26
    },
    btnCadastro: {
        backgroundColor: theme.colors.amarelo,
        borderRadius: 20,
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 13,
        marginBottom: 30
    },
    text: {
        fontFamily: theme.fonts.raj_bold,
        color: theme.colors.branco,
        fontSize: 22
    }
});