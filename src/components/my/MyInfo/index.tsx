import MineCrewList from '../MineCrewList';
import ProfileDetail from '../ProfileDetail';

export default function MyInfo() {
  return (
    <div className="tablet:gap-6 flex flex-col gap-5">
      <ProfileDetail />
      <MineCrewList />
    </div>
  );
}
