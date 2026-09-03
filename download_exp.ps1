$items = @(
  @{ name='exp-lodieu.jpg'; url='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600' },
  @{ name='exp-deolodieu.jpg'; url='https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600' },
  @{ name='exp-muiganh.jpg'; url='https://images.unsplash.com/photo-1472806426350-603610d85659?q=80&w=600' },
  @{ name='exp-tamquan.jpg'; url='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600' },
  @{ name='exp-lavuong.jpg'; url='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600' },
  @{ name='exp-mybinh.jpg'; url='https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600' },
  @{ name='exp-muivirong.jpg'; url='https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=600' },
  @{ name='exp-gaocoffee.jpg'; url='https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600' }
)

foreach ($item in $items) {
  $target = Join-Path "assets" $item.name
  try {
    Invoke-WebRequest -Uri $item.url -OutFile $target -UserAgent 'Mozilla/5.0'
    Write-Output "Downloaded: $($item.name)"
  } catch {
    Write-Output "Failed: $($item.name)"
  }
}
