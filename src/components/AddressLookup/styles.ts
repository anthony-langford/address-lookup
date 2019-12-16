import styled from 'styled-components';

// Components
import Geosuggest from 'react-geosuggest';

// Constants
import { colors, device, breakpoints } from '../../styles/partials';

export const AddressLookupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddressSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AddressSearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchBarWrapper = styled.div`
  flex: 1;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.CHARCOAL};
`;

export const SearchBar = styled(Geosuggest)`
  .address-search-list {
    position: absolute;
    background: white;
    border-radius: 4px;
    padding: 10px;
    list-style: none;
    z-index: 10000;
    border: 1px solid ${colors.GREY_MID};

    .address-search-list-item {
      border-bottom: 1px solid ${colors.GREY_MID};
      min-height: 35px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        cursor: pointer;
        color: ${colors.BLUE};
      }
    }
  }

  .geosuggest__input-wrapper {
    input {
      border: 1px solid ${colors.YELLOW};
      border-radius: 4px;
      width: 100%;
      padding: 8px 10px;
      color: ${colors.CHARCOAL};
    }
  }
  .geosuggest__suggests-wrapper {
    .geosuggest__suggests--hidden {
      display: none;
    }
  }
`;

export const UnitInputWrapper = styled.div`
  width: 100px;
  margin-left: 20px;
`;

export const UnitInput = styled.input`
  border: 1px solid ${colors.YELLOW};
  border-radius: 4px;
  width: 100%;
  padding: 8px 10px;
  color: ${colors.CHARCOAL};
`;

export const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: ${colors.BLUE};
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media (min-width: ${breakpoints.MOBILE}) {
    padding: 0 40px 0 0;
  }

  @media ${device.MOBILE} {
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 200px;
  padding: 6px 10px;
  border: 1px solid ${colors.GREY_MID};
  border-radius: 4px;

  @media ${device.MOBILE} {
    width: 100%;
  }
`;

export const AddressDetailsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface AddressInputProps {
  error: boolean;
}

export const AddressInput = styled.input<AddressInputProps>`
  width: 200px;
  padding: 8px 10px;
  border: 2px solid ${props => (props.value ? colors.GREEN : colors.RED)};
  border-radius: 4px;
`;

export const AddressPreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
