// Arquivo com funções utilitárias

export const capitalize = (text) => {
    if (!text) return ""; // Retorna string vazia caso o input seja inválido
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const toUpperCaseText = (text) => {
    if (!text) return ""; // Retorna string vazia caso o input seja inválido
    return text.toUpperCase();
};