import FakeTextInputField from './FakeTextInputField';
import SearchAddressButton from './SearchAddressButton';

export default function AddressInput({
  location,
  openAddressSearch,
  setLocation,
  setCity,
  setDistrict,
}: {
  location: string;
  openAddressSearch: (
    callback: (data: { address: string; sido: string; sigungu: string }) => void
  ) => void;
  setLocation: (location: string) => void;
  setCity: (city: string) => void;
  setDistrict: (district: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <FakeTextInputField location={location} />
      <SearchAddressButton
        location={location}
        onClick={() =>
          openAddressSearch((data) => {
            setLocation(data.address);
            setCity(data.sido);
            setDistrict(data.sigungu);
          })
        }
      />
    </div>
  );
}
