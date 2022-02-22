import styled from 'styled-components';
import { Typography } from 'antd';

const {Text} = Typography;

const base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}em;
`;

export const StyledScrollableDiv = styled.div`
  height: 200px;
  overflow: auto;
  padding: 0 16px;
  border-radius: 5px;

  &::-webkit-scrollbar {
    border-radius: 5px;
    background-color: transparent;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #dddddd;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: transparent;
  }
`;

export default styled(base)({});
