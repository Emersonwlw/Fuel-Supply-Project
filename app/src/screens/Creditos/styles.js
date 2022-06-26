import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: theme.colors.cinzabackground
    },
    viewFiltrar: {
        backgroundColor: theme.colors.branco,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15
    },
    viewBtnFiltrar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        marginLeft: 7,
        borderColor: '#D1CFCF',
        borderWidth: 0.7
    },
    btnFiltrar: {
        width: '100%',
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtnFiltrar: {
        fontFamily: theme.fonts.mon_regular,
        fontSize: 14,
        color: theme.colors.preto,
        opacity: 0.78
    },

    containerPosto:{
        backgroundColor: theme.colors.branco,
        margin: 10,
        padding: 18,
        borderRadius: 5,
        marginBottom: 4
    },
    container:{
        flexDirection: 'row',
        marginBottom: 15
    },
    viewImage:{
        backgroundColor: theme.colors.cinza,
        width: 115,
        height: 115
    },
    info:{
        marginLeft: 8
    },
    titulo:{
        fontFamily: theme.fonts.mon_bold,
        color: theme.colors.laranja,
        fontSize: 18,
        marginBottom: 5
    },
    textInfo:{
        fontSize: 14,
        fontFamily: theme.fonts.mon_regular,
        color: theme.colors.cinza
    },
    viewBtn: {
        marginTop: 10,
        alignItems: 'flex-end'
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120
    },
    textBtn: {
        fontFamily: theme.fonts.mon_bold,
        color: theme.colors.amarelo,
        fontSize: 18
    },
    mensagem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    txtMsg: {
        fontSize: 18,
        color: theme.colors.cinzaescuro,
        fontFamily: theme.fonts.mon_regular
    }
})