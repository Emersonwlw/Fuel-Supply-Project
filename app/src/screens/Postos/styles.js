import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: theme.colors.cinzabackground
    },
    viewPesquisar:{
        backgroundColor: theme.colors.branco,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 2,
        position: 'relative',
        paddingBottom: 60,
        marginBottom: -10
    },
    input: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.cinza,
        fontSize: 18,
        color: theme.colors.cinza,
        padding: 10,
        paddingRight: 55,
        position: 'absolute',
        opacity: 0.6
    },
    btnPesquisar: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        right: 25
    },
    viewLista: {
        marginTop: 20
    }, 
    scroll: {
        marginBottom: 80
    },

    containerPosto:{
        backgroundColor: theme.colors.branco,
        margin: 10,
        padding: 18,
        borderRadius: 5,
        marginBottom: 4
    },
    viewImage:{
        backgroundColor: theme.colors.cinza,
        width: 115,
        height: 115
    },
    container:{
        flexDirection: 'row',
        marginBottom: 15
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
    }
});