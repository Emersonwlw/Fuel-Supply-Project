import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.cinzaescuro
    },
    viewImg: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        height: '30%',
        opacity: 0.5
    },
    img: {
        height: 130,
        width: 110
    },
    login:{
        backgroundColor: theme.colors.branco,
        height: '70%',
        padding: 36,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
    titulo: {
        fontFamily: theme.fonts.mon_semibold,
        color: theme.colors.laranja,
        fontSize: 26,
        marginBottom: 12
    },
    subtitulo: {
        fontFamily: theme.fonts.mon_regular,
        color: theme.colors.cinza,
        fontSize: 18,
        marginBottom: 68
    },
    viewInput: {
        justifyContent: 'center',
        marginBottom: 20
    },
    input: {
        borderBottomColor: '#B6B9B8',
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        fontSize: 16,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        color: theme.colors.cinza
    },
    icon: {
        position: 'absolute',
        left: 11
    },
    iconEye: {
        position: 'absolute',
        right: 11
    },
    txtSenha: {
        fontFamily: theme.fonts.mon_medita,
        color: theme.colors.azul,
        fontSize: 14
    },
    btnSenha: {
        alignItems: 'center',
        width: 150,
    },
    containerSenha: {
        alignItems: 'flex-end',
        marginBottom: 35
    },
    btnCad: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22
    },
    txtCad: {
        fontFamily: theme.fonts.raj_bold,
        color: theme.colors.laranja,
        fontSize: 20
    },
    btn: {
        backgroundColor: theme.colors.amarelo,
        borderRadius: 20,
        height: Platform.OS == 'ios' ? 50 : 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 13
    },
    text: {
        fontFamily: theme.fonts.raj_bold,
        color: theme.colors.branco,
        fontSize: 22
    }
});