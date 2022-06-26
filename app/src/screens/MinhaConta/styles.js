import { StyleSheet, Platform } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.cinzabackground,
  },
  viewNome: {
    backgroundColor: theme.colors.amarelo,
    height: Platform.OS == 'ios' ? 90 : 40,
    justifyContent: "center",
    padding: 28,
  },
  nome: {
    fontFamily: theme.fonts.osw_regular,
    fontSize: 24,
    color: theme.colors.preto,
  },
  info: {
    backgroundColor: theme.colors.branco,
    height: "95%",
    margin: 10,
    padding: 15,
    borderRadius: 10
  },
  titulo: {
    fontSize: 16,
    fontFamily: theme.fonts.mon_semibold,
    marginTop: 10,
    color: theme.colors.cinzaescuro,
  },
  input: {
    borderColor: theme.colors.amarelo,
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: theme.fonts.mon_regular,
    color: theme.colors.cinzaescuro,
  },
  viewBtn: {
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: theme.colors.amarelo,
    marginTop: '8%',
    marginBottom: '4%'
  },
  txtBtn: {
    fontFamily: theme.fonts.raj_bold,
    fontSize: 20,
    color: theme.colors.branco,
    textTransform: 'uppercase'
  }
});
