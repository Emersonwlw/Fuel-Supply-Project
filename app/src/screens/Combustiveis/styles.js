import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.cinzabackground
    },
    cabecalho: {
        width: '100%',
        flexDirection: 'row',
        padding: 22,
        backgroundColor: theme.colors.branco
    },
    pesquisar: {
        width: '70%',
        flexDirection: 'row'
    },
    input: {
        fontSize: 18,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.cinza,
        fontFamily: theme.fonts.mon_regular,
        width: '100%',
        padding: 5,
        opacity: 0.6
    },
    icon: {
        position: 'absolute',
        right: 10,
        marginTop: 8
    },
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        marginLeft: 7,
        borderColor: '#D1CFCF',
        borderWidth: 0.7
    },
    btn: {
        width: '100%',
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        fontFamily: theme.fonts.mon_regular,
        fontSize: 14,
        color: theme.colors.preto,
        opacity: 0.78
    },
    viewTitulo: {
        height: Platform.OS == 'ios' ? 70 : 60,
        padding: 15,
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 24,
        fontFamily: theme.fonts.mon_semibold,
        color: theme.colors.cinzaescuro,
        marginLeft: 10,
        marginTop: 10,
    },
    scroll: {
        marginBottom: 5
    },

    //flatlist

    containerComb:{
        backgroundColor: theme.colors.branco,
        margin: 10,
        padding: 20,
        borderRadius: 5,
        marginBottom: 1
    },
    containerList:{
        flexDirection: 'row',
        marginBottom: 15
    },
    tituloComb: {
        fontFamily: theme.fonts.mon_semibold,
        fontSize: 18,
        color: theme.colors.laranja
    },
    textInfo: {
        fontSize: 14,
        fontFamily: theme.fonts.mon_regular,
        color: theme.colors.cinza
    },
    valor: {
        fontFamily: theme.fonts.mon_semibold,
        fontSize: 16,
        color: theme.colors.verde
    },
    viewBtnComprar: {
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textBtnComprar: {
        fontSize: 18,
        fontFamily: theme.fonts.mon_bold,
        color: theme.colors.amarelo
    },
    btnComprar: {
        width: 110,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textImg:{
        color: theme.colors.branco,
        fontSize: 80,
        fontFamily: theme.fonts.raj_semibold,
        textTransform: 'uppercase'
    }
})