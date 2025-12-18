import MineCrewList from '../MineCrewList';
import Profile from '../Profile';

export default function MyInfo() {
  return (
    <div className="tablet:gap-6 flex flex-col gap-5">
      <Profile />
      <MineCrewList />
    </div>
  );
}
