import styled from 'styled-components';
import { Typography, Image } from 'antd';

const {Text} = Typography;

const base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}em;
`;

export const StyledPrice = styled(Text)`
  color: #1EA4CE;
  font-size: 16px;
  font-weight: 650;
  text-align: right;
`;

export const StyledTitle = styled(Text)`
  color: black;
  font-size: 16px;
  font-weight: 600;
  text-align: right;
`;

export const StyledImage = styled(Image)`
  width: 200px;
  height: 300px;
  object-fit: contain;
`;
export default styled(base)({});
