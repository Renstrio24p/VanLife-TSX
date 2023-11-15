export const Join = (classes: string[]) => {
    return classes.filter(item => item !== '')
    .join(' ')
    .trim();
}