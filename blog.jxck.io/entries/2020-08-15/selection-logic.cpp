// device_scale_factor = DPR
static unsigned SelectionLogic(Vector<ImageCandidate*>& image_candidates, float device_scale_factor) {
  unsigned i = 0;

  for (; i < image_candidates.size() - 1; ++i) {
    unsigned next = i + 1;
    float next_density;
    float current_density;
    float geometric_mean;

    next_density = image_candidates[next]->Density();

    // next の密度が DSF より小さいならまだ先をみる必要
    if (next_density < device_scale_factor) {
      continue;
    }

    // next の密度が DSF より大きい、つまり表示に十分だとわかった
    // そこで curr とのどっちを表示するかを考える
    current_density = image_candidates[i]->Density();

    // そのために幾何平均をまず取る
    geometric_mean  = sqrt(current_density * next_density);

    // curr が DPR より低くても、 DPR が 1 なら next を使う
    // もしくは
    // Geo が DSF より小さいなら next
    // (そうでないなら curr)
    if (((current_density < device_scale_factor) && (device_scale_factor <= 1.0)) || (geometric_mean <= device_scale_factor)) {
      return next;
    }
    break;
  }
  return i;
}
