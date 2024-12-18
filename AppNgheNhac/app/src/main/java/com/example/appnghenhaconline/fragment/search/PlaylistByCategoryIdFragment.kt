package com.example.appnghenhaconline.fragment.search

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.appnghenhaconline.MyLib
import com.example.appnghenhaconline.R
import com.example.appnghenhaconline.adapter.playlistAdapter.PlaylistByCategoryAdapter
import com.example.appnghenhaconline.api.ApiService
import com.example.appnghenhaconline.fragment.search.SearchFragment
import com.example.appnghenhaconline.models.playlist.DataPlayList
import com.example.appnghenhaconline.models.playlist.Playlist
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PlaylistByCategoryIdFragment: Fragment() {
    internal lateinit var view: View
    private lateinit var rcvPlByCategory : RecyclerView
    private lateinit var listPlByCategory : ArrayList<Playlist>
    private lateinit var plByCategoryAdapter : PlaylistByCategoryAdapter
    private lateinit var nameCategory: TextView
    private lateinit var idCategory : String
    private lateinit var btnBack: ImageView

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                                savedInstanceState: Bundle?): View? {

        view = inflater.inflate(R.layout.fm_list_playlist_by_category, container, false)
        init()
        return view
    }

    private fun init(){
        rcvPlByCategory = view.findViewById(R.id.rcvPlaylistByCategory)
        btnBack = view.findViewById(R.id.btnBack)
        nameCategory = view.findViewById(R.id.tvCategoryName)
        initPlaylistInfo()
        event()
    }

    private fun event() {
        btnBack.setOnClickListener {
            val fragmentLayout = SearchFragment()
            MyLib.changeFragment(requireActivity(), fragmentLayout)
        }
    }

    private fun initPlaylistInfo(){
        val bundle = requireArguments()
        if (bundle != null){
            idCategory = bundle.getString("id_category")!!
            nameCategory.text = bundle.getString("name_category")
            initPlaylistByCategory()
        }
    }

    private fun initPlaylistByCategory(){
        listPlByCategory = ArrayList()
        plByCategoryAdapter = PlaylistByCategoryAdapter(view.context, listPlByCategory)

        rcvPlByCategory.layoutManager = GridLayoutManager(view.context,2)
        rcvPlByCategory.setHasFixedSize(true)
        rcvPlByCategory.adapter = plByCategoryAdapter

        callApiGetPlaylistByCategoryID(listPlByCategory,plByCategoryAdapter,idCategory)
    }

    private fun callApiGetPlaylistByCategoryID(playlist : ArrayList<Playlist>, playlistByCategoryAdapter : PlaylistByCategoryAdapter, categoryId : String) {
        ApiService.apiService.getPlaylistByCategoryID(categoryId).enqueue(object : Callback<DataPlayList?> {
            override fun onResponse(call: Call<DataPlayList?>, response: Response<DataPlayList?>) {
                var dataPlaylist = response.body()
                if(dataPlaylist != null) {
                    if(!dataPlaylist.error) {
                        // Chỗ Nãy nghĩa lấy list playlist với adaptor xuất lên nhé
                        val listPlaylist: ArrayList<Playlist> = dataPlaylist.listPlayList
                        playlist.addAll(listPlaylist)
                        playlistByCategoryAdapter.notifyDataSetChanged()
                    }
                    else {
                        MyLib.showLog("SearchFragment.kt: " + dataPlaylist.message)
                    }
                }
            }

            override fun onFailure(call: Call<DataPlayList?>, t: Throwable) {
                MyLib.showToast(requireContext(),"Call Api Error")
            }
        })
    }
}