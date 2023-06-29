export default function PickRating() {
  return (
    <div className="rating">
  <input type="radio" name="rating" defaultValue={1} className="mask mask-star" />
  <input type="radio" name="rating" defaultValue={2} className="mask mask-star" />
  <input type="radio" name="rating" defaultValue={3} className="mask mask-star" />
  <input type="radio" name="rating" defaultValue={4} className="mask mask-star" />
  <input type="radio" name="rating" defaultValue={5} className="mask mask-star" />
</div>
  );
}