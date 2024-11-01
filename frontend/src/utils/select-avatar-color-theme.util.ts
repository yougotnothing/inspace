import { Colors } from 'utils/colors.enum';

export const selectAvatarColorTheme = (): string => {
  const colors = Object.values(Colors);
  return colors[Math.floor(Math.random() * colors.length)];
};
