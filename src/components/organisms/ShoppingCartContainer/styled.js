import styled from 'styled-components';
import { Button, Typography } from 'antd';

const {Text} = Typography;

const base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}em;
`;

export const StyledPrice = styled(Text)`
  color: #1EA4CE;
  font-size: 15px;
  font-weight: 650;
  text-align: right;
`;

export const StyledTitle = styled(Text)`
  color: black;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
`;

export const StyledButton = styled(Button)`
  color: #1EA4CE;
  font-size: 20px;
  font-weight: 700;
  text-align: right;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCountDiv = styled.div`
  background-color: #1EA4CE;
  width: 25px;
  height: 33px; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const StyledCartPriceDiv = styled.div`
  color: #1EA4CE;
  border: 2px solid #1EA4CE;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 45px;
`;
export default styled(base)({});
