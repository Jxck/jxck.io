// device_scale_factor = DPR
// source_size = sizes attr value
static ImageCandidate PickBestImageCandidate(float device_scale_factor, float source_size, Vector<ImageCandidate>& image_candidates, Document* document = nullptr) {
  const float kDefaultDensityValue = 1.0;
  bool ignore_src = false;

  // 画像がなければ無視
  if (image_candidates.IsEmpty()) {
    return ImageCandidate();
  }

  // 画像ごとに表示領域に対する密度を計算(1.0 だとフィット)
  // http://picture.responsiveimages.org/#normalize-source-densities
  for (ImageCandidate& image : image_candidates) {
    if (image.GetResourceWidth() > 0) {
      float gensity = (float)image.GetResourceWidth() / source_size;
      image.SetDensity(gensity);
      ignore_src = true;
    } else if (image.Density() < 0) {
      image.SetDensity(kDefaultDensityValue);
    }
  }

  // 密度でソート
  std::stable_sort(image_candidates.begin(), image_candidates.end(), CompareByDensity);

  Vector<ImageCandidate*> de_duped_image_candidates;
  float prev_density = -1.0;

  // 同じ密度を省く?
  for (ImageCandidate& image : image_candidates) {
    if (image.Density() != prev_density && (!ignore_src || !image.SrcOrigin())) {
      de_duped_image_candidates.push_back(&image);
    }
    prev_density = image.Density();
  }

  // SelectionLogic で画像を選択
  // Save Data してる場合は一番小さいの、ここでは無視
  // unsigned winner = blink::WebNetworkStateNotifier::SaveDataEnabled() && base::FeatureList::IsEnabled(blink::features::kSaveDataImgSrcset) ? 0 : SelectionLogic(de_duped_image_candidates, device_scale_factor);
  unsigned winner = SelectionLogic(de_duped_image_candidates, device_scale_factor);
  DCHECK_LT(winner, de_duped_image_candidates.size());
  winner = AvoidDownloadIfHigherDensityResourceIsInCache(de_duped_image_candidates, winner, document);

  float winning_density = de_duped_image_candidates[winner]->Density();
  // 16. If an entry b in candidates has the same associated ... pixel density
  // as an earlier entry a in candidates,
  // then remove entry b
  while ((winner > 0) && (de_duped_image_candidates[winner - 1]->Density() == winning_density))
    --winner;

  return *de_duped_image_candidates[winner];
}
